export async function main(ns) {
    var flags = ns.flags([
        ['v', false],
        ['verbose', false],
        ['f', false],
        ['force', false],
        ['r', false],
        ['R', false],
        ['recursive', false],
        ['h', ''],
        ['host', ''],
        ['help', false],
        ['test', true]
    ]);
    var verbose = flags.verbose || flags.v;
    var force = flags.force || flags.f;
    var recursive = flags.r || flags.R || flags.recursive;
    var host = flags.h || flags.host || ns.getHostname();
    var paths = flags._;
    if (paths.length === 0 || flags.help) {
        var currentScript = ns.getScriptName();
        var manualPath = currentScript.substring(0, currentScript.lastIndexOf('/') + 1) + 'manual.txt';
        var manual = ns.read(manualPath);
        ns.tprint(`\n${manual}\n`);
        ns.exit();
    }
    var cwd = GetCWD(ns);
    if (cwd === '/')
        cwd = '';
    for (var index in paths) {
        var oldPath = paths[index];
        if (oldPath.startsWith('/'))
            continue;
        if (oldPath.endsWith('/'))
            paths[index] = `${cwd}${paths[index]}`;
        else
            paths[index] = `${cwd}/${paths[index]}`;
    }
    return await rm_command(ns, paths, verbose, force, recursive, host);
}
function GetCWD(ns) {
    var doc = eval('document');
    var terminalInput = doc.getElementById('terminal-input');
    var cwdElement = terminalInput?.previousSibling;
    if (cwdElement) {
        var cwd = cwdElement.innerText;
        return cwd.substring(cwd.indexOf('/'), cwd.lastIndexOf(']'));
    }
    if (ns) {
        ns.tprint(`Error: Couldn't determine working directory. Aborting.`);
        ns.exit();
    }
    return '';
}
async function rm_command(ns, paths, verbose, force, recursive, host) {
    var pathsToDelete = [];
    for (var path of paths) {
        if (path.endsWith('.msg')) {
            ns.tprint(`Cannot delete .msg files. Skipping ${path}`);
            continue;
        }
        GatherFiles(ns, host, path, recursive, pathsToDelete);
    }
    if ((recursive || pathsToDelete.length >= 3) && !force) {
        var output = 'Preparing to delete:\n';
        for (var file of pathsToDelete)
            output += `${file}\n`;
        ns.tprint(output);
        var decision = await ns.prompt(`Proceed to delete files listed in terminal?`);
        if (!decision)
            ns.exit();
    }
    for (var file of pathsToDelete) {
        DeleteFile(ns, file, verbose, host);
    }
}
export function rm(ns, paths, options) {
    var pathsToDelete = [];
    for (var path of paths) {
        GatherFiles(ns, options.host, path, !!options.recursive, pathsToDelete);
    }
    for (var file of pathsToDelete) {
        DeleteFile(ns, file, false, options.host);
    }
}
function DeleteFile(ns, fullpath, verbose, host) {
    var fileNoLeadingSlash = fullpath.slice(1);
    var slashIndex = fileNoLeadingSlash.indexOf('/');
    var fileToDelete = slashIndex === -1 ? fileNoLeadingSlash : fullpath;
    if (verbose)
        ns.tprint(`Deleting ${fileToDelete}...`);
    ns.rm(fileToDelete, host);
}
function GatherFiles(ns, host, path, recursive, paths) {
    if (IsDeletableFile(path)) {
        paths.push(path);
    }
    else if (recursive) {
        var dirPath = path.endsWith('/') ? path : `${path}/`;
        if (!dirPath.startsWith('/'))
            dirPath = `/${dirPath}`;
        var fullpaths = ns.ls(host, dirPath);
        for (var fullpath of fullpaths) {
            if (fullpath.startsWith(dirPath) && IsDeletableFile(fullpath))
                paths.push(fullpath);
        }
    }
    else {
        ns.tprint(`${path} is a directory. Pass -r -R or --recursive to delete directories.`);
        ns.exit();
    }
}
function IsDeletableFile(file) {
    return (file.endsWith('.txt') ||
        file.endsWith('.lit') ||
        file.endsWith('.js') ||
        file.endsWith('.ns') ||
        file.endsWith('.script') ||
        file.endsWith('.cct') ||
        file.endsWith('.exe') ||
        file.endsWith('INC'));
}
export function autocomplete(data, args) {
    var cwd = GetCWD();
    if (cwd !== '/')
        cwd += '/';
    var candidates = [...data.txts, ...data.scripts];
    var autos = {};
    for (var path of candidates) {
        var fullpath = path.startsWith('/') ? path : `/${path}`;
        if (fullpath.startsWith(cwd)) {
            var relativePath = fullpath.substring(cwd.length);
            var slashIndex = relativePath.indexOf('/');
            var auto = slashIndex === -1 ? relativePath : relativePath.substring(0, slashIndex + 1);
            autos[auto] = auto;
        }
    }
    return Object.keys(autos);
}