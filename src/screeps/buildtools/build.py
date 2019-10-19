from argparse import ArgumentParser
import logging
import os
import subprocess
from typing import Callable, List


log = logging.getLogger(__name__)


def transcrypt(source: str, minify: bool, dirty_build: bool,
               additional_opts: List[str] = []):
    cmd = ['transcrypt']
    if not minify:
        cmd = cmd + ['-n']
    if not dirty_build:
        cmd = cmd + ['-b']
    if additional_opts:
        cmd = cmd + additional_opts
    cmd = cmd + ['-p', '.none', '-e', '6', source]
    log.debug(f'Calling Transcrypt with commandline: {cmd}')
    ret = subprocess.Popen(cmd).wait()
    log.debug(f'Process returned with result "{ret}"')


def validate_dir(path: str):
    if os.path.isdir(path):
        return path
    else:
        raise FileNotFoundError(path)


def validate_file(path: str):
    if os.path.isfile(path):
        return path
    else:
        raise FileNotFoundError(path)


def build(source_dir: str, dirty_build: bool, minify: bool,
          additional_opts: List[str] = [], **kwargs):
    log.info('Running build...')
    transcrypt(
        source=validate_file(os.path.join(source_dir, 'screeps', 'main.py')),
        minify=minify,
        dirty_build=dirty_build,
        additional_opts=additional_opts,
    )


def setup_subparser(subparser: ArgumentParser) -> Callable:
    subparser.add_argument(
        '--source_dir',
        action='store',
        default='./src',
        help='Location of source directory. (Default: "%(default)s")',
        type=lambda x: validate_dir(str(x))
    )
    subparser.add_argument(
        '--minify',
        action='store_true',
        default=False,
        help='Minify resulting JavaScript.',
    )
    subparser.add_argument(
        '--dirty_build',
        action='store_true',
        default=False,
        help='Don\'t clean before build.',
    )
    subparser.add_argument(
        '--transcrypt_opt', '-o',
        action='append',
        metavar='OPTION',
        dest='additional_opts',
        default=[],
        help='Additional Transcrypt options. May be defined multiple times.',
    )

    return build
