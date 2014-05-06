#SynoScrape
SynoScrape is a scary-sounding, but ultimately friendly, Chrome extension that provides synonyms for highlighted/selected words. I created this extension as a learning experience in writing Google Chrome extensions and web-scraping. SynoScrape uses the Yahoo Query Language (https://developer.yahoo.com/yql/) to access http://www.thesuarus.com/ and scrape results before displaying them back to the user via an alert. Since this may be considered unethical I'm not releasing the extension via the Chrome Web Store. For those interested in learning from it, though, I've decided to upload it here on Github. 

###Installation
Download the .crx file. Open up the Chrome Extensions page in your browser and drop it in to install.

###Use
Once installed and enabled, select some text and right click it. A SynoScrape item will appear in the context menu. Clicking it will query Thesaurus.com in the background and create an alert that lists up to ten synonyms for your selected word. If more than one word is selected, SynoScrape will cut your selection down to the first word and query using that word only.

###Other
I originally wanted all of this to occur in a single context menu with children items. This proved to be a pain in the ass, and after several unsuccessful iterations I opted to return to using an alert to serve the results. The main issue was timing the delay from using the YQL query and the creation of the context menu. If you are interested in the non-release and more complicated version of the code, feel free to send me an email at andymaul123@gmail.com.
