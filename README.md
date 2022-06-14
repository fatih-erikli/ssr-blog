# Serverside rendered blog

I have tried something completely against to current web trends. What are these?

- I am using the React as backend framework with it's server-side rendering support
- I deployed my application on a run-and-forget worker service of Cloudflare
- The application works without Javascript (so it is javascript but the output is like html in 1990s)

And yet I have not completed it yet. React also supports "Hydration". It allows you to convert your static application into an alive React single-page application. I have not implemented it yet because it's not necessary for my case, which is just a blog application with an admin panel.

I publish the source code as an open-source project.

<https://github.com/fatih-erikli/ssr-blog>
