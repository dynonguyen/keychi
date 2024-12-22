//go:build js && wasm

package main

import (
	"fmt"
	"syscall/js"

	"golang.org/x/crypto/argon2"
)

// password, salt []byte, time, memory uint32, threads uint8, keyLen uint32
func Argon2Hash(this js.Value, args []js.Value) interface{} {
	if len(args) < 4 {
		return "Insufficient arguments: password, salt, time, memory required"
	}

	password := []byte(args[0].String())
	salt := []byte(args[1].String())
	time := uint32(args[2].Int())
	memory := uint32(args[3].Int())

	threads := uint8(1)
	if len(args) > 4 {
		threads = uint8(args[4].Int())
	}

	keyLen := uint32(32)
	if len(args) > 5 {
		keyLen = uint32(args[5].Int())
	}

	hash := argon2.Key(password, salt, time, memory, threads, keyLen)

	return js.ValueOf(fmt.Sprintf("%x", hash))
}

func main() {
	js.Global().Set("argon2Hash", js.FuncOf(Argon2Hash))
	select {}
}
