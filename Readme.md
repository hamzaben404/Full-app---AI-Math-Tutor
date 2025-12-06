every developer clone this repo in local, create a branch (this is important) develop its functionality and create a new pull request. (hamza et youssra) makayench ta chi mochkil ila kane ghalat n3awdo we7da okhra ola nrej3o l initial commit le plus important howa t creer la branche dyalkom t developiw fiha 3la khatrkom independamment de la branche main, fach kolchi ikoune mezyane nzidouh fl main.

## Hamza :

- Integrate (chatbot et fastapi) to the platform : branch 'assistant'

## Youssra :

- Integrate the recommender system to the landing page : branch 'recommender'

## How to ? :

Here's a step-by-step guide for the process you described, including the necessary commands and workflow for each developer:

### 1. **Clone the Repository**

Each developer should clone the remote repository to their local machine. This can be done by running the following command:

```bash
git clone <repository-url>
```

Example:

```bash
git clone https://github.com/username/math-tutor-saas.git
```

This will create a local copy of the repository.

### 2. **Create a New Branch**

Once the repository is cloned, every developer needs to create a new branch to work on their specific functionality. This ensures that all changes are isolated and won't affect the `main` branch.

To create a new branch, run:

```bash
git checkout -b <branch-name>
```

#### For **Hamza**:

- **Task**: Integrate (chatbot and FastAPI) to the platform
- **Branch Name**: `chatbot-fastapi`

```bash
git checkout -b chatbot-fastapi
```

#### For **Youssra**:

- **Task**: Integrate the recommender system to the landing page
- **Branch Name**: `recommender`

```bash
git checkout -b recommender
```

### 3. **Develop the Functionality**

Now, each developer works on their specific task. For example:

- **Hamza** would work on integrating the chatbot and FastAPI into the platform.
- **Youssra** would work on integrating the recommender system into the landing page.

As you develop, remember to commit your changes regularly to track progress.

### 4. **Commit Changes Locally**

Once the functionality is implemented, commit the changes locally using the following command:

```bash
git add .
git commit -m "Description of changes"
```

The `git add .` command stages all changes for commit, and the `git commit` command creates a snapshot of those changes with a message describing what was done.

### 5. **Push the Changes to the Remote Repository**

After committing the changes locally, push them to the corresponding remote branch:

```bash
git push origin <branch-name>
```

#### For **Hamza**:

```bash
git push origin chatbot-fastapi
```

#### For **Youssra**:

```bash
git push origin recommender
```

### 6. **Create a Pull Request (PR)**

Once the changes are pushed to the remote repository, go to the GitHub (or other Git hosting service) page for the repository. You will usually see an option to create a Pull Request (PR) for the newly pushed branch.

- For **Hamza**, the PR would merge `chatbot-fastapi` into `main`.
- For **Youssra**, the PR would merge `recommender` into `main`.

In the Pull Request, describe the functionality you’ve developed and why it’s important. If needed, ask team members for a review.

### 7. **Resolve Conflicts (If Any)**

If there are any conflicts when merging the PR (for example, if two branches modify the same lines of code), you will need to resolve them. This is done manually in your local repository:

- First, pull the latest changes from the `main` branch:

  ```bash
  git checkout main
  git pull origin main
  ```

- Then, merge your branch with the `main` branch:

  ```bash
  git merge <your-branch-name>
  ```

If there are conflicts, Git will mark the files that need to be fixed. You can open the files and resolve the conflicts. After fixing the conflicts, add the changes and commit:

```bash
git add .
git commit -m "Resolved merge conflicts"
```

Then push the changes again to the remote repository.

### 8. **Merge the Pull Request**

Once the pull request is reviewed and approved, you can merge the changes into the `main` branch. Usually, this step is done by the team lead or whoever has the necessary permissions.

---

### **Summary of Commands**

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Create a new branch**:

   ```bash
   git checkout -b <branch-name>
   ```

3. **Commit changes**:

   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push changes to remote**:

   ```bash
   git push origin <branch-name>
   ```

5. **Create a Pull Request** on GitHub.

6. **Resolve conflicts (if any)**:

   ```bash
   git checkout main
   git pull origin main
   git merge <your-branch-name>
   git add .
   git commit -m "Resolved merge conflicts"
   git push origin <branch-name>
   ```

By following these steps, each developer can work independently, and the code will eventually be merged into the `main` branch without conflicts.
