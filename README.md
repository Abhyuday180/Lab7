1. Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.
   
Within a Github action that runs whenever code is pushed 
Automated tests should run within a GitHub Action on every code push to catch bugs early and ensure consistent code quality. This provides immediate feedback and prevents broken code from being merged

2 Would you use an end to end test to check if a function is returning the correct output? (yes/no)

No, unit tests would be better.
3. What is the difference between navigation and snapshot mode?

Navigation mode is used to simulate and wait for full page transitions, like clicking a link or submitting a form. 
Snapshot mode captures the current state of the page to detect visual or structural changes over time.

4. Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.
- Properly size images – Many images are too large for their displayed size, resulting in over 500 KiB of potential savings. Compressing and resizing them appropriately would reduce load time and improve performance.
- Use modern image formats like WebP or AVIF – Lighthouse reports show over 165 KiB could be saved by switching from JPEG to next-gen formats, which offer better compression without noticeable quality loss.
- Add a <meta name="viewport"> tag – This is missing from the site and is crucial for responsive design and mobile usability, directly impacting accessibility and best practices scores.





