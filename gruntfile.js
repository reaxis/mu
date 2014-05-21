var compiler = require("superstartup-closure-compiler");

module.exports = function(grunt) {
	grunt.loadNpmTasks("grunt-closure-tools");
	grunt.loadNpmTasks("grunt-string-replace");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.initConfig({
		closureCompiler: {
			options: {
				compilerFile: compiler.getPath(),
				compilerOpts: {
					compilation_level: "SIMPLE_OPTIMIZATIONS"
				},
			},
			compile: {
				src: "mu.js",
				dest: "mu.min.js"
			}
		},
		"string-replace": {
			compile: {
				files: {
					"mu.min.js": "mu.min.js"
				},
				options: {
					replacements: [{
						pattern: /\\u00b5/g,
						replacement: "µ"
					}, {
						pattern: /\n/g,
						replacement: ""
					}]
				}
			}
		},
		watch: {
			compile: {
        		files: ["mu.js"],
				tasks: ["compile"]
			}
		}
	});

	grunt.registerTask("compile", ["closureCompiler", "string-replace"]);
	grunt.registerTask("default", ["compile", "watch:compile"]);
};