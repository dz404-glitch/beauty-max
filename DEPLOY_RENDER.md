# Deploy Beauty Max to Render (Free)

## Step 1: Push to GitHub

1. Go to [github.com](https://github.com) and sign up (free)
2. Create a new repository called `beauty-max`
3. In your local folder `c:\Users\desti_lsyccbq\.vscode\beauty-max`, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/beauty-max.git
   git push -u origin main
   ```

## Step 2: Connect to Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select your `beauty-max` repository
4. Fill in:
   - **Name:** `beauty-max`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
5. Click **"Create Web Service"**

## Step 3: Wait for deployment

- Render will build and deploy your app
- You'll get a free URL like `https://beauty-max.onrender.com`
- Your app is now **live on the internet**!

## Step 4: Google indexing

- Share the link anywhere
- Google will eventually crawl and index it
- Search for your app on Google (may take days)

---

**Note:** First request after idle time (~15 mins) will be slow because Render's free tier auto-sleeps. Subsequent requests are faster.

Your app will be at: `https://beauty-max.onrender.com`
