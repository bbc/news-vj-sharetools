module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: './sharetools',
                    name: 'ShareTools',
                    out: './sharetools.js',
                    paths: {
                        'bootstrap': 'empty:',
                        'TemplateEngine': 'empty:',
                        'ShareTools': 'ShareToolsController',
                        'text': './../node_modules/requirejs-text/text',
                    },
                    preserveLicenseComments: false,
                    stubModules : ['text'],
                    normalizeDirDefines: true
                }
            }
        },
        'string-replace': {
            dist: {
                files: {
                    './': 'sharetools.js',
                },
                options: {
                    replacements: [{
                        pattern: /text\!templates\//ig,
                        replacement: 'templates/'
                    },
                    { 
                        pattern: 'define("text",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),',
                        replacement: ''
                    }]
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs', 'string-replace']);
};
