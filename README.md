## What you will be building

An application that allows you to find jobs on The Muse. You’ll be building a web page that will allow a user to find different jobs on The Muse using our public facing API. Our developers page has a bunch of different information about our api endpoints, including show­casing example json responses as well as different arguments that you can pass to the API.

The [jobs api](https://www.themuse.com/developers/api/v2#jobs-endpoint) endpoint doesn’t allow you to pass search queries to the API, however it does allow you to pass in different parameters to filter the jobs that are being returned. For example, if you looks at the developer's page you can filter jobs by company , location, and other available filters. Utilizing these different filters you can request jobs that meet different criterias. Please attempt to utilize all these different filter options in your application. Feel free to design the UI and application architecture however you wish and which allows you to showcase your skills as a developer to us.

We want to encourage you to ask any and all questions you may have about the project and API (we expect you will have questions and we think that’s great :)). We’ll be available to answer any question that you may have.

Please don't spend too much time on this project. The intent is to see how you architect apps, what your code looks like, etc. not to gauge your degree of perseverance.

Please create a repo on github for the project and send us the link when you have finished.

Thank you and we are looking forward to seeing what you produce!

### Notes
 * For brevity I've left  certain single versions of the components within the list versions since I was only using the list version.
 * The number of options for category and location were manually set to about 4. In a prod app this would be fetched from an API for extensibility I would imagine. This would also use some sort of dropdown for the sections, or move all filters to a side swiped menu altogether.
 * You might be asking why the factory pattern for all React components, this allows easy decoupling of deps when creating a component.
 * Only one wrapper container class exist, which is main, to allow use of React's state management. There are other options but this is the simplest.
 * Usually I would use less or sass, but in this case materialize was used for
 speed, which is why components are not exporting their own styles for the build.

### How to Run
	* Pull down repo, npm install
	* npm start
