select (
    insert Account { name:= <str>$name, kind:= <str>$kind, types:= array_unpack(<array<str>>$types) }
) {
    name,
    id,
    types,
    kind
}
