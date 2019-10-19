import argparse
import logging
import pkg_resources
from typing import Dict


log = logging.getLogger(__name__)


def load_subcommands() -> Dict:
    subcommands = {}
    for entry_point in pkg_resources.iter_entry_points('screeps_subcommands'):
        subcommands[entry_point.name] = entry_point.load()

    return subcommands


def main(args=None):
    parser = argparse.ArgumentParser()
    parser.set_defaults(func=lambda **x: parser.print_help())
    parser.add_argument('--loglevel',
                        action='store',
                        choices=list(logging._nameToLevel.keys()),
                        default='INFO',
                        type=str,
                        help='Set loglevel (Default: "%(default)s")',
                        )
    subparsers = parser.add_subparsers(title='subcommand',
                                       description='Screeps subcommands')

    for name, setup_func in load_subcommands().items():
        subparser = subparsers.add_parser(name)
        subparser.set_defaults(func=setup_func(subparser))

    args = parser.parse_args(args)

    logging.basicConfig(level=args.loglevel)

    args.func(**vars(args))
