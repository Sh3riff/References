https://github.com/facebook/create-react-app/issues/9091


//////
I found the solution to this. 
Instead of just changing Firstname Lastname to Firstname~1 or Firstname~Lastname , check what the short name for your Username directory is. 
You can do this by opening the CMD as an administrator and running dir /x in the parent folder of the folder whose short name you're trying to find. 
In this case since you want to know the short name to your Firstname Lastname folder, the parent folder will be C:/Users. So go to C:/Users and run dir /x. 
You'll find the short name of your Firstname Lastname folder. It may not necessarily be Firstname~1. In my case, it was FirstnameL~1. 
After this you can run npm config set cache "C:/Users/<shortname-you-found-with-dir/x>/AppData/Roaming/npm-cache" --global. 
Now you should be able to run npx create-react-app my-app without any issue.
///
