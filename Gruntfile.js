module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    
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
                    preserveLicenseComments: false
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs']);
};
