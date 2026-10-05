#!/bin/sh
# 프로토타입에 토큰 밖 색 값이 남았는지 확인 (주석, 토큰 정의, 토큰 참조 제외)
python3 - "$1" << 'PY'
import re, sys
s = open(sys.argv[1], encoding="utf-8").read()
s = re.sub(r"<!--.*?-->", "", s, flags=re.S)
s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
s = re.sub(r":root\s*\{[^}]*\}", "", s)
s = re.sub(r"rgb\(var\(--[a-z0-9-]+-rgb\)[^)]*\)", "", s)
s = re.sub(r"var\(--[a-z0-9-]+\)", "", s)
bad = [(s[:m.start()].count("\n")+1, m.group(0)) for m in re.finditer(r"#[0-9A-Fa-f]{3,6}\b|rgba?\([^)]*\)", s)]
print("토큰 밖 색 값:", len(bad))
for ln, v in bad: print(f"  line {ln}: {v}")
sys.exit(1 if bad else 0)
PY
