module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    var requirePaths =  {
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
                    // optimize: 'none', // useful for debugging
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
