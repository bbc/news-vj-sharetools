module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: './',
                    name: './controller',
                    out: './sharetools.js',
                    paths: {
                        'bootstrap': 'empty:',
                        'TemplateEngine': 'empty:',
                        'sharetools': './',
                        'text': './node_modules/requirejs-text/text',
                    },
                    preserveLicenseComments: false
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs']);
};
