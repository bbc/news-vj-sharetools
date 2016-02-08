module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    var requirePaths =  {
        'jquery':     'lib/jquery-2.1.5.min',
        'ShareTools': 'ShareToolsController',
        'text':       './../node_modules/requirejs-text/text'
    };

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
                            paths: requirePaths
                        }
                    }
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './src',
                    name:    'ShareTools',
                    out:     './bin/sharetools.min.js',
                    paths: requirePaths,
                    preserveLicenseComments: false,
                    stubModules : ['text'],
                    normalizeDirDefines: true
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    './': 'bin/sharetools.min.js',
                },
                options: {
                    replacements: [{
                        pattern:     /text\!templates\//ig,
                        replacement: 'templates/'
                    },
                    {
                        pattern:     'define("text",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),',
                        replacement: ''
                    }]
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs', 'jasmine:all', 'string-replace']);
};
