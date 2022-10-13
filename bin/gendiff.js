#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program.option('-h, --help', 'display help for command')
.description( 'Compares two configuration files and shows a difference.')
.version('0.0.1', '-V, --version', 'output the version number')
.parse();