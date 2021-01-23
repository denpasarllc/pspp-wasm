#!/bin/sh

~/Downloads/emsdk-master/upstream/emscripten/emcc -static -r -o libgl.o -O3 -s WASM=1 \
	-s RELOCATABLE=1 \
	-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s NO_EXIT_RUNTIME=1 --no-entry \
	-s EXPORT_ALL=1 \
	-I<path_to_project>/denpasar/ \
	-I<path_to_project>denpasar/gl/ \
	-I<path_to_project>/Downloads/denpasar/gl/sys \
	glthread/*.c unicase/*.c unictype/*.c unigbrk/*.c unilbrk/*.c uninorm/*.c unistr/*.c uniwbrk/*.c uniwidth/*.c \
	alloca.c allocator.c areadlink.c asnprintf.c asprintf.c asyncsafe-spin.c \
	basename-lgpl.c basename.c binary-io.c btowc.c \
	c-asprintf.c c-ctype.c c-snprintf.c c-strcasecmp.c c-strcasestr.c c-strncasecmp.c c-strtod.c c-vasnprintf.c \
	c-vasprintf.c c-xasprintf.c canonicalize-lgpl.c careadlinkat.c clean-temp.c cloexec.c close.c \
	count-leading-zeros.c count-one-bits.c crc.c dirname-lgpl.c dirname.c dtoastr.c dtotimespec.c \
	dup2.c error.c exitfail.c explicit_bzero.c fatal-signal.c fd-hook.c float.c floor.c fopen.c \
	frexp.c frexpl.c fstat.c ftell.c ftello.c ftoastr.c full-read.c \
	full-write.c fwriteerror.c getdelim.c getdtablesize.c getline.c getpass.c \
	getprogname.c getrandom.c gettime.c gettimeofday.c gl_linked_list.c gl_linkedhash_list.c gl_list.c \
	gl_xlist.c hard-locale.c imaxtostr.c inttostr.c isfinite.c isinf.c iswblank.c iswdigit.c iswxdigit.c \
	itold.c lc-charset-dispatch.c localcharset.c localeconv.c localename-table.c localename.c lseek.c \
	lstat.c malloc.c malloca.c math.c mbchar.c mbiter.c mbrtowc.c mbsinit.c mbtowc-lock.c mbtowc.c md4.c \
	memcasecmp.c memchr.c memchr2.c memmem.c mempcpy.c memrchr.c mkdir.c mkdtemp.c mkstemp.c mktime.c \
	nl_langinfo.c nstrftime.c offtostr.c open.c pipe2.c printf-args.c printf-frexp.c printf-frexpl.c \
	printf-parse.c progname.c progreloc.c raise.c rawmemchr.c read-file.c read.c readlink.c \
	realloc.c rename.c rijndael-alg-fst.c rijndael-api-fst.c rmdir.c round.c safe-read.c safe-write.c \
	secure_getenv.c select.c setenv.c setlocale-lock.c setlocale_null.c sig-handler.c signbitd.c \
	signbitf.c signbitl.c snprintf.c sockets.c stat-time.c stat-w32.c stat.c stpcpy.c strcasecmp.c \
	strcasestr.c strdup.c strerror-override.c strerror.c stripslash.c strncasecmp.c strncat.c strndup.c \
	strnlen.c strsep.c sys_socket.c tempname.c  timegm.c timespec-add.c timespec-sub.c \
	timespec.c tmpdir.c trunc.c tzset.c uinttostr.c umaxtostr.c unistd.c unsetenv.c vasnprintf.c vasprintf.c\
	version-etc-fsf.c version-etc.c vprintf.c vsnprintf.c vsprintf.c wcrtomb.c wctype-h.c \
	wcwidth.c write.c xalloc-die.c xasprintf.c xbinary-io.c xmalloc.c xmalloca.c xmemdup0.c xreadlink.c \
	xsize.c xstrndup.c xvasprintf.c unistd.c