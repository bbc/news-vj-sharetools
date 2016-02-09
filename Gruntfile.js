module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    var requirePaths =  {
        'jquery':     'empty:',
        'ShareTools': 'ShareToolsController',
        'text':       './../node_modules/requirejs-text/text'
    };
    var jasminePaths = JSON.parse(JSON.stringify(requirePaths)); // quick dirty object clone
    jasminePaths['jquery'] = './../tests/helpers/jquery-2.1.5.min';

    grunt.initConfig({
        jasmine: {
            all: {
                src: 'src/*.js',
                options: {
                    specs: 'tests/*[sS]pec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: './src',
                            paths: jasminePaths
                        }
                    }
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    //optimize: 'none', // useful for debugging
                    baseUrl: './src',
                    name:    'ShareTools',
                    out:     './bin/sharetools.min.js',
                    paths: requirePaths,
                    preserveLicenseComments: false,
                    stubModules : ['text'],
                    normalizeDirDefines: true
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs', 'jasmine:all']);
};
