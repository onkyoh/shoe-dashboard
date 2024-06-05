# shoez.run

Now hosted at [https://shoez.run](https://shoez.run) this project is a full-stack Sveltekit app that provides a resource for learning about running shoes.

The main features are as follows:

- **Search:** Search and query for a modern running shoe based on its name, brands, specifications, or even what run type it is good for. It's dead simple to find and compare shoes.
- **Groups:** This website highlights the importance of sharing information. Create or join a group to gain and share personal thoughts regarding everything running shoes.
- **Notes:** Leave notes on a shoe page to remember or share your thoughts on the shoe with your group.
- **Resources:** An ever-growing curated resources page that provides all the essential sources and information to freshen up your running shoe knowledge.

## Technology

For those of you interested the following will highlight some key technologies used in this website's development:

- **Sveltekit:** A full-stack Javascript framework specifically chosen for its lightweight feel, ease of use, and powerful routing and server functions.
- **Supabase:** Dead simple BaaS that enabled quick and easy development. Key features being utilized are the relational Postgres DB, email and Google auth, Row Level Policies to handle authorization, and triggers that enable automatic DB updates.
- **AWS:** Although not included here this website relies on a few AWS features. The first is a Lambda function which scrapes the [RunningShoesGuru](https://www.runningshoesguru.com/) website to add to the website's shoe database. This Lambda function scrapes via Python's [Beautiful Soup](https://pypi.org/project/beautifulsoup4/) library. The scraping is triggered by an AWS cron job and occurs once a day with alerts set up during failures. Additionally, AWS Simple Email Service is being utilized to handle Supabase functions which require emails such as email auth and password resets.
- **Tailwind CSS:** Tailwind is being utilized for styling along with the [shadcn-svelte](https://www.shadcn-svelte.com/) component library.
- **Netlify:** For simple and free SSR hosting Netlify is being used with Sveltekits netlify-adaptor.

## Potential added features

- [ ] - Search enabled for notes and resource content.
- [ ] - Always adding more resources
- [ ] - Preferences within the profile page

## Contributions

Any contributions are welcomed simply create a pull request with your changes.
