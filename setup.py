#!/user/bin/env python

from setuptools import setup, find_packages


setup(
    name='screeps',
    version='0.1.0',
    author='Bryan Wyatt',
    author_email='brwyatt@gmail.com',
    description=('Screeps AI code'),
    license='GPLv3',
    keywords='screeps game',
    url='https://github.com/brwyatt/Screeps',
    packages=find_packages(where='src'),
    package_dir={'': 'src'},
    include_package_data=False,
    entry_points={
        'console_scripts': [
            'screeps_build = buildtools.build:main',
        ]
    },
    install_requires=[
        'Transcrypt>=3.5.0,<3.7.0',
    ],
)
