### Git tips and tricks

#### Commits

* Show commits history
```
git log
git log --pretty=format:"%h %ad | %s%d [%an]" --graph --date=short
```

* Show commit changes
```
git show `sha-commit` # sha can be shor or long
git show 55579a5 # sha short example
git show 55579a5e4215650c021b95bda94e76ff26d62606 # sha long example
```

* Show commit changed files
```
git show `sha-commit` --name-only
```

#### Stages

* Show stages: untracked files, changes not staged for commit, changes to be committed
```
git status
```

* Show current changes
```
git diff # all
git diff filename # file
```

* Undo file changes
```
git checkout filename
git checkout -p # partial
```

* Add changes to be commited
```
git add filename # whole file
git add -p # partial
git add -u # only stage the modified files
```

* Unstage changes
```
git reset HEAD filename # whole file
git reset -p # partial
```

* Show changes will be commited
```
git diff --staged
```

* Create commit
```
git commit -m "Commit comment"
```

* Undo commit
```
git reset --soft HEAD^ # keep commit stage
git reset HEAD^ # keep in not commit stage
```

* Revert commit
```
git revert `sha-commit`
```

* Revert file from commit
```
git show `sha-commit` -- filename | git apply -R
```

#### Branches

* Show branches
```
git branch # local
git branch -a # with remote
```

* Go into branch
```
git checkout branch-name
git checkout - # previous brunch
```

* Create branch from the current 
```
git checkout -b feature-branch
```

* Rename local branch
```
git branch -m old-branch-name new-brach-name
```

* Push branch to remote 
```
git push origin feature-branch
```

* Delete local branch
```
git branch -d brach-name # already merged
git branch -D brach-name # force delete
```

* Delete remote branch
```
git push origin :remote-branch-name
```

* Rename remote branch
```
git checkout -b new-branch-name
git push origin new-branch-name
git push origin :old-branch-name
```

* Pick one file from another brunch
```
git checkout branch file.txt # local
git checkout origin/branch file.text # remote
git show origin/branch:file.txt > file.txt
```

* Remove file/dir from index
```
git rm --cached filename
git rm -r --cached directoryname
```

* Work with remote origins
```
git remote -v # show origins
git remote add `origin-name` `git@github.com:user/repo.git` # add origin
git remote set-url `origin-name` `git@github.com:user/repo.git` # set origin url
git remote rm `origin-name` # remove origin
```

#### Submodules

* Add submodule
```
git submodule add {url} {path} #
```

* Update submodules
```
git submodule update --init
```

* Remove submodule
```
git submodule deinit {path}
```
or below 1.8.3 version
```
git config -f .gitmodules --remove-section submodule.{path}
git config -f .git/config --remove-section submodule.{path}
git rm --cached {path}
rm -Rf {path}
rm -Rf .git/modules/{path}
# commit .gitmodules with remove submodule message
```

### Config `.gitconfig`
```
[user]
  name = Your Name
  email = your@example.email
[alias]
  co = checkout
  br = branch
  st = status
  cm = commit -m
  cam = commit --amend
  ds = diff --staged
  fix = commit --fixup
  squash = commit --squash
  pr = pull --rebase
  rc = rebase --continue
  ri = rebase --interactive --autosquash
  ra = rebase --abort
  rs = rebase --skip
  sub = submodule update --init
  hi = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
  show-files = show --pretty="format:" --name-only
[rerere]
  enabled = 1
```
