## Functions
<dl>
<dt><a href="#listRepositories">listRepositories(serverURL, callback)</a></dt>
<dd><p>Lists all repositories on a server</p>
</dd>
<dt><a href="#loadRepoFromName">loadRepoFromName(repoName, callback)</a></dt>
<dd><p>loads a populated repo json object based on a name</p>
</dd>
<dt><a href="#addRepo">addRepo(newRepo)</a></dt>
<dd><p>Adds a new repository to a knowhow server specified by param serverUDL</p>
</dd>
<dt><a href="#updateRepo">updateRepo(serverURL, existingRepo, callback)</a></dt>
<dd><p>Modifies an existing repo obejct on a knowhow server with the values specified in the repo object</p>
</dd>
<dt><a href="#deleteRepo">deleteRepo(repo, callback)</a></dt>
<dd><p>Deletes a repository on a knowhow server</p>
</dd>
<dt><a href="#loadRepo">loadRepo(repo, subDir, callback)</a></dt>
<dd><p>Returns a directory tree structure starting at a specified subDir- used to load a tree widget</p>
</dd>
<dt><a href="#addFile">addFile(path, newFile, content, isDirectory, callback)</a></dt>
<dd><p>Adds a file to specified repository</p>
</dd>
<dt><a href="#deleteFile">deleteFile(filePath, force, callback)</a></dt>
<dd><p>Deletes specified file from a repository</p>
</dd>
<dt><a href="#saveFile">saveFile(filePath, fileContent, callback)</a></dt>
<dd><p>saves a file    in the specified filePAth on a knowhow server</p>
</dd>
<dt><a href="#loadURL">loadURL(URL)</a></dt>
<dd><p>retrieves an environment object from a knowhow URL</p>
</dd>
<dt><a href="#importFileRepositoryFromGit">importFileRepositoryFromGit(repo, gitURL, gitUser, gitPAssword, callback)</a></dt>
<dd><p>Imports a repository from a git server Url into a new file repository.</p>
</dd>
<dt><a href="#importFileRepositoryFromTarBall">importFileRepositoryFromTarBall(repo, tarBallFile, callback)</a></dt>
<dd><p>Imports a repository from a tarball(.tar.gz) file</p>
</dd>
<dt><a href="#importFileRepositoryFromServer">importFileRepositoryFromServer(repoToCreate, KHHostRepoName, KHServerURL, callback)</a></dt>
<dd><p>Imports a repository from a a knowhow server</p>
</dd>
<dt><a href="#downloadRepoAsTarBall">downloadRepoAsTarBall(repo, savePath)</a></dt>
<dd><p>Downloads a knowhow repository as a tarball.  This tarball may be reimport as a new repository on any knowhow server.</p>
</dd>
<dt><a href="#KHRepository">KHRepository(serverURL, EventHandler)</a></dt>
<dd><p>Factory method for KHJob</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#loadFile">loadFile</a> : <code>function</code></dt>
<dd><p>Loads a File from the specified repository</p>
</dd>
</dl>
<a name="listRepositories"></a>
## listRepositories(serverURL, callback)
Lists all repositories on a server

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL |  |
| callback | function to call when done with parameters (error, repoList) |

<a name="loadRepoFromName"></a>
## loadRepoFromName(repoName, callback)
loads a populated repo json object based on a name

**Kind**: global function  

| Param | Description |
| --- | --- |
| repoName | the name of the repositry |
| callback | callback function to execute when complete with parameters (error, repoObject) |

<a name="addRepo"></a>
## addRepo(newRepo)
Adds a new repository to a knowhow server specified by param serverUDL

**Kind**: global function  

| Param | Description |
| --- | --- |
| newRepo | A json object describing the new repository with parameters (error, repoObject) |

<a name="updateRepo"></a>
## updateRepo(serverURL, existingRepo, callback)
Modifies an existing repo obejct on a knowhow server with the values specified in the repo object

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL | the URL of the knowhow server ex :http://localhost:3001 |
| existingRepo | a json object describing a repository - _id must be specified |
| callback | callback functions with parameters (error, modifiedRepoObject) |

<a name="deleteRepo"></a>
## deleteRepo(repo, callback)
Deletes a repository on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object representing the repo to delete - _id must be specified |
| callback | callback function with parameters (error, deletedRepo) |

<a name="loadRepo"></a>
## loadRepo(repo, subDir, callback)
Returns a directory tree structure starting at a specified subDir- used to load a tree widget

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object representing a repository to use |
| subDir | the point in the repository to start - ex: /jobs |
| callback | callback function with params (error, repoTree) |

<a name="addFile"></a>
## addFile(path, newFile, content, isDirectory, callback)
Adds a file to specified repository

**Kind**: global function  

| Param | Description |
| --- | --- |
| path | the repository path of the file - ex: /jobs/myJob.json |
| newFile | new file name |
| content | text content of the file to add |
| isDirectory | flag for whether of not file is a directory |
| callback | callback function with parameters (error, newFile) |

<a name="deleteFile"></a>
## deleteFile(filePath, force, callback)
Deletes specified file from a repository

**Kind**: global function  

| Param | Description |
| --- | --- |
| filePath | the absolute directory structure of the file to delete ex /myRepo/job/myJob.json |
| force |  |
| callback | callback function with parameters (error, deletedFile) |

<a name="saveFile"></a>
## saveFile(filePath, fileContent, callback)
saves a file	in the specified filePAth on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| filePath | the absolute directory path of a specified file on the knowhow server host |
| fileContent | the text content of the file |
| callback | callbacj function with params (error, file) |

<a name="loadURL"></a>
## loadURL(URL)
retrieves an environment object from a knowhow URL

**Kind**: global function  

| Param | Description |
| --- | --- |
| URL | the knowhow URL we are attempting to load |

<a name="importFileRepositoryFromGit"></a>
## importFileRepositoryFromGit(repo, gitURL, gitUser, gitPAssword, callback)
Imports a repository from a git server Url into a new file repository.

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object with the expected repo values: name and path |
| gitURL | URL of the git repository |
| gitUser | if supplied will attempt to use as part of the url |
| gitPAssword | use only if server requires password authentication |
| callback | to execute when finished |

<a name="importFileRepositoryFromTarBall"></a>
## importFileRepositoryFromTarBall(repo, tarBallFile, callback)
Imports a repository from a tarball(.tar.gz) file

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object with the expected repo values: name and path |
| tarBallFile | the file path of the tarball file |
| callback | to execute when finished |

<a name="importFileRepositoryFromServer"></a>
## importFileRepositoryFromServer(repoToCreate, KHHostRepoName, KHServerURL, callback)
Imports a repository from a a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| repoToCreate | a json object with the expected repo values: name and path |
| KHHostRepoName | the name of the repo on the knowhow server we are importing from |
| KHServerURL | the url of the knowhow server |
| callback | to execute when finished |

<a name="downloadRepoAsTarBall"></a>
## downloadRepoAsTarBall(repo, savePath)
Downloads a knowhow repository as a tarball.  This tarball may be reimport as a new repository on any knowhow server.

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | the knowhow repository to download |
| savePath | where to save the tarball |

<a name="KHRepository"></a>
## KHRepository(serverURL, EventHandler)
Factory method for KHJob

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL | the url of the server |
| EventHandler |  |

<a name="loadFile"></a>
## loadFile : <code>function</code>
Loads a File from the specified repository

**Kind**: global typedef  

| Param | Description |
| --- | --- |
| serverURL | the URL of the knowhow server ex :http://localhost:3001 |
| repo | a json object representing a repository to use |
| path | the repository path of the file - ex: /jobs/myJob.json |

