module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: './',
                    name: './sharetools/controller',
                    out: './sharetools.js',
                    paths: {
                        'bootstrap': 'empty:',
                        'TemplateEngine': 'empty:',
                        'text': './node_modules/requirejs-text/text',
                    },
                    preserveLicenseComments: false
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs']);
};
