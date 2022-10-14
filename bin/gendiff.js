#!/usr/bin/env node
import { program } from 'commander';

program
.name("gendiff ")
.usage("[options]")
.description( 'Compares two configuration files and shows a difference.')
.version('0.0.1', '-V, --version', 'output the version number')
.parse();