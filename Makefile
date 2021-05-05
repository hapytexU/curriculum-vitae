dirs = $(shell find site/ -type d)
fils = $(shell find site/ -mindepth 1 -type f)
filso = $(fils:site/%=out_/%)

all: dirs $(filso)

dirs: $(dirs)
	mkdir -p $(dirs:site/%=out_/%)

out_/%.html: site/%.html
	minify --html-keep-document-tags "$<" -o "$@"

out_/%.css: site/%.css
	minify "$<" -o "$@"

out_/%.svg: site/%.svg
	scour "$<" > "$@"

out_/%.js: site/%.js
	ln -f "$<" "$@"
	# minify "$<" > "$@"

out_/%: site/%
	ln -f "$<" "$@"
