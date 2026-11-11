#!/bin/bash
find src/app -type f -name "*.ts" -exec sed -i -E 's/font-bold uppercase tracking-wider/font-semibold/g' {} +
find src/app -type f -name "*.ts" -exec sed -i -E 's/uppercase tracking-wider font-bold/font-semibold/g' {} +
find src/app -type f -name "*.ts" -exec sed -i -E 's/uppercase tracking-wider/font-semibold/g' {} +
find src/app -type f -name "*.ts" -exec sed -i -E 's/font-bold uppercase tracking-widest/font-semibold/g' {} +
find src/app -type f -name "*.ts" -exec sed -i -E 's/uppercase tracking-widest font-bold/font-semibold/g' {} +
find src/app -type f -name "*.ts" -exec sed -i -E 's/uppercase tracking-widest/font-semibold/g' {} +
