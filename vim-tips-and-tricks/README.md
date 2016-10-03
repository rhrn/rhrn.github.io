#### Vim tips and tricks

* Jump between modifications  
`g;` - backward  
`g,` - forward  
`` `. `` - to last  
`<Ctrl>i` - backward through files  
`<Ctrl>o` - forward through files  

* Editing  
`ct` + *character* - delete till character with insert mode  
`di` + *character* - delete between charactes (quotes, brackets)  
`cw` - replace word with insert mode  
`xp` - swap two characters  
`~` - invert letter case (A->a, a->A)  
`viw~`  - flip case word under cursor
`u` - undo  
`<Ctrl>r` - redo  
`S` - modify line

* Find word  
`/` + *pattern* - by pattern  
`/\c` + *pattern* - case insensitivity  
`*` - under cursor forwards  
`#` - under cursor backwards  
`<ctrl>r + 0`- paste yanked text in patterns input  

* Find character  
`f` + *character* in line  
`;` - next character  
`,` - prev character  

* Copy and paste  
`yy` - copy line  
`p` - paste line  
`Vp` - replace line from yank  
`yiw` - copy inner word  
`viwp` - replace word from yank  
`"ayy` - copy line to register *a*  
`"Ayy` - appned another line to register *a*  
`"ap` - paste register *a*  
`:.w !pbcopy` - copy current line to clipboard (Mac OS X)  
`ggVG` and `:w !pbcopy` - copy whole file to clipboard (Mac OS X)  
`r !pbpaste` - paste from clipboard (Mac OS X)  

* Info  
`:ls` - show buffers  
`:f` - show current file info  
`:pwd` - show current directory  
`:ju` - show list of modifications  
`:reg` - display contents of all registers

* Open files  
`:e` + *path* - open one file  
`:E` - file explorer  

* Open recent files
  1. `:bro ol` - open recent files list
  1. `q` - open prompt terminal and type file number

* Fix indent  
`=` - on line  
`=%` - in the current braces  
`gg=G` - global file  

* Delete Window carriage return character ^M  
`:%s/<Ctrl>v<Ctrl>m//g`  

* Misc  
`>>` - indent right line by tab  
`<<` - indent left line by tab  
`.` - repeat last command  
`:%s=  *$==` - delete end of line blanks

* Visaul mode  
`v` - default mode  
`<Ctrl>v` - vertical mode  
`<Shift>v` - select by lines  

* View tabs, spaces...
```
:set list "show
:set nolist "hide
```

#### Config `.vimrc`
* Indents switch functions
  * Hard tabs (\t)
  ```
  function! Tabs()
      set softtabstop=8
      set shiftwidth=8
      set tabstop=8
      set noexpandtab
  endfunction
  ```
  * Soft tabs (2 spaces)
  ```
  function! Spaces()
      set softtabstop=2
      set shiftwidth=2
      set tabstop=2
      set expandtab
  endfunction
  ```
  * Usage `:execute Spaces()` and `:execute Tabs()`


* Tiny search highlight
```
highlight Search ctermfg=Grey ctermbg=NONE cterm=NONE
```

* UTF
```
set encoding=utf-8
set fileencoding=utf-8
set termencoding=utf-8
```
