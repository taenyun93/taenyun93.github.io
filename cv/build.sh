#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
pdflatex -interaction=nonstopmode -halt-on-error CV.tex
bibtex CV
pdflatex -interaction=nonstopmode -halt-on-error CV.tex
pdflatex -interaction=nonstopmode -halt-on-error CV.tex
mkdir -p ../assets
cp CV.pdf ../assets/CV_Taenyun_Kim.pdf
