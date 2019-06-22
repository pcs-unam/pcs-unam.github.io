SHELL := /bin/bash

all: build

build: pull tutoresgen cursosgen
	/usr/local/bin/bundle exec jekyll build
	cp -R /var/www/static ~/pcs-unam.github.io/_site


fast: pull

	mv tutores/perfiles ~/tutores_perfiles_md

	mkdir ~/tutores_perfiles_site
	mv _site/tutores/* ~/tutores_perfiles_site/

	/usr/local/bin/bundle exec jekyll build

	mv ~/tutores_perfiles_md tutores/perfiles

	mv ~/tutores_perfiles_site/* _site/tutores/
	rmdir ~/tutores_perfiles_site

	cp -R /var/www/static ~/pcs-unam.github.io/_site	

pull:
	git pull


cursosgen:
	source /var/www/siges/venv/bin/activate ; \
	/var/www/siges/posgradmin/manage.py exporta_cursos --cursos 08_cursos.md --outdir cursos
tutoresgen:
	source /var/www/siges/venv/bin/activate ; \
	/var/www/siges/posgradmin/manage.py exporta_academicos tutores

