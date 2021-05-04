dirs = $(shell find site/ -type d)
fils = $(shell find site/ -mindepth 1 -type f)
filso = $(fils:site/%=out_/%)

all: dirs $(filso)

dirs: $(dirs)
	mkdir -p $(dirs:site/%=out_/%)

out_/%.html: site/%.html
	minify "$<" -o "$@"

out_/%.css: site/%.css
	yui-compressor -o "$@" "$<"

out_/%.js: site/%.js
	yui-compressor -o "$@" "$<"

out_/%: site/%
	ln -f "$<" "$@"