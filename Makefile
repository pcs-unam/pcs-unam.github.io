SHELL := /bin/bash

all: build

build: pull tutoresgen
	/usr/local/bin/bundle exec jekyll build
	cp -R /var/www/static ~/pcs-unam.github.io/_site


fast: pull
	mv _site/tutores ~/tutores_site
	mv tutores/perfiles ~/tutores_perfiles_md
	/usr/local/bin/bundle exec jekyll build
	mv ~/tutores_perfiles_md tutores/perfiles
	mv ~/tutores_site _site/tutores

	cp -R /var/www/static ~/pcs-unam.github.io/_site	

pull:
	git pull


tutoresgen:
	source /var/www/siges/venv/bin/activate ; \
	/var/www/siges/posgradmin/manage.py exporta_academicos tutores

