const excerpt = (str: string, start: number, end: number) => {
  return str.slice(start, end) + " ... ";
};

const blogCategories = [
  "Food",
  "Travel",
  "Lifestyle",
  "Fashion",
  "Health",
  "Sports",
  "Technology",
  "Business",
  "Entertainment",
  "Music",
  "Movies",
  "TV",
  "Books",
  "News",
  "Politics",
  "Religion",
  "Science",
  "History",
  "Education",
  "Art",
  "Photography",
  "Hobbies",
  "Home",
  "Garden",
  "Pets",
  "Family",
  "Finance",
  "Work",
  "Fitness",
  "Spirituality",
  "Comedy",
];

export { blogCategories, excerpt };
