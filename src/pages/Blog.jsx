import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  InputBase,
  IconButton,
  Divider,
  Pagination,
  useTheme,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Blog = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Organizing a Successful Football Tournament",
      excerpt:
        "Planning a football tournament can be challenging. Here are our top tips to ensure your event runs smoothly and is enjoyed by all participants.",
      image: "https://source.unsplash.com/random/600x400/?football,tournament",
      author: "Alex Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "May 15, 2023",
      category: "Tips & Tricks",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "The Benefits of Regular Team Sports for Mental Health",
      excerpt:
        "Research shows that participating in team sports like football can have significant positive effects on mental health and well-being.",
      image: "https://source.unsplash.com/random/600x400/?team,sports",
      author: "Sarah Williams",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "April 28, 2023",
      category: "Health & Fitness",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "How Technology is Changing the Way We Book Sports Facilities",
      excerpt:
        "Digital platforms are revolutionizing how sports enthusiasts find and book venues. Learn about the latest trends in sports facility booking.",
      image: "https://source.unsplash.com/random/600x400/?technology,sports",
      author: "Michael Chen",
      authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      date: "April 10, 2023",
      category: "Technology",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "The Rise of Small-Sided Football: Why 5-a-Side is Booming",
      excerpt:
        "Small-sided football formats are growing in popularity worldwide. Discover why more players are choosing 5-a-side over traditional 11-a-side games.",
      image: "https://source.unsplash.com/random/600x400/?football,five",
      author: "Emily Rodriguez",
      authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      date: "March 22, 2023",
      category: "Trends",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Maintaining Football Fields: Best Practices for Groundskeepers",
      excerpt:
        "Proper maintenance is crucial for the longevity and playability of football fields. Learn expert tips from professional groundskeepers.",
      image: "https://source.unsplash.com/random/600x400/?football,field",
      author: "David Smith",
      authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "March 5, 2023",
      category: "Maintenance",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "How to Choose the Perfect Football Field for Your Match",
      excerpt:
        "Not all football fields are created equal. Here is what to look for when booking a venue for your next game or practice session.",
      image: "https://source.unsplash.com/random/600x400/?football,pitch",
      author: "Jessica Lee",
      authorAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
      date: "February 18, 2023",
      category: "Tips & Tricks",
      readTime: "6 min read",
    },
  ];

  // Categories
  const categories = [
    "All",
    "Tips & Tricks",
    "Health & Fitness",
    "Technology",
    "Trends",
    "Maintenance",
  ];

  // Popular posts
  const popularPosts = blogPosts.slice(0, 3);

  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const postsPerPage = 4;
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ pt: 12, pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "secondary.main",
          color: "white",
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            right: -100,
            bottom: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 106, 0, 0.1)",
            zIndex: 0,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: -50,
            top: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 106, 0, 0.1)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textAlign: "center",
                }}
              >
                SportSpace{" "}
                <span style={{ color: theme.palette.primary.main }}>Blog</span>
              </Typography>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  maxWidth: 800,
                  mx: "auto",
                  textAlign: "center",
                  opacity: 0.9,
                }}
              >
                Insights, tips, and stories from the world of football and
                sports facility management
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Blog Content Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  mb: 4,
                  borderRadius: 2,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => handleCategoryClick(category)}
                    color={
                      selectedCategory === category ? "primary" : "default"
                    }
                    variant={
                      selectedCategory === category ? "filled" : "outlined"
                    }
                    sx={{
                      fontWeight: selectedCategory === category ? 600 : 400,
                      "&:hover": {
                        bgcolor:
                          selectedCategory === category
                            ? "primary.main"
                            : "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  />
                ))}
              </Box>
            </motion.div>

            {/* Blog Posts */}
            {displayedPosts.length > 0 ? (
              <Grid container spacing={4}>
                {displayedPosts.map((post, index) => (
                  <Grid item xs={12} key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          borderRadius: 3,
                          overflow: "hidden",
                          height: "100%",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-10px)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: { xs: "100%", sm: 240 },
                            height: { xs: 200, sm: "auto" },
                          }}
                          image={post.image}
                          alt={post.title}
                        />
                        <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Chip
                              label={post.category}
                              size="small"
                              color="primary"
                              sx={{ mr: 1 }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {post.readTime}
                            </Typography>
                          </Box>
                          <Typography
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 700, mb: 1 }}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            paragraph
                          >
                            {post.excerpt}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                src={post.authorAvatar}
                                sx={{ width: 32, height: 32, mr: 1 }}
                              />
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {post.author}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {post.date}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              component={Link}
                              to={`/blog/${post.id}`}
                              color="primary"
                              endIcon={<ArrowForwardIcon />}
                            >
                              Read More
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" color="text.secondary">
                  No posts found matching your search criteria.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  sx={{ mt: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            )}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* About Blog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  mb: 4,
                  bgcolor: "secondary.main",
                  color: "white",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  About Our Blog
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Welcome to the SportSpace blog, where we share insights, tips,
                  and stories about football, sports facility management, and
                  the community we serve.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/contact"
                  fullWidth
                >
                  Subscribe to Newsletter
                </Button>
              </Paper>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  mb: 4,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Categories
                </Typography>
                <List disablePadding>
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category, index) => (
                      <React.Fragment key={category}>
                        <ListItem
                          button
                          onClick={() => handleCategoryClick(category)}
                          sx={{
                            px: 0,
                            py: 1,
                            borderRadius: 1,
                            cursor: "pointer",
                            bgcolor:
                              selectedCategory === category
                                ? "rgba(255, 106, 0, 0.1)"
                                : "transparent",
                            "&:hover": {
                              bgcolor: "rgba(255, 106, 0, 0.05)",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <LocalOfferIcon
                              color={
                                selectedCategory === category
                                  ? "primary"
                                  : "action"
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={category}
                            primaryTypographyProps={{
                              fontWeight:
                                selectedCategory === category ? 600 : 400,
                              color:
                                selectedCategory === category
                                  ? "primary.main"
                                  : "text.primary",
                            }}
                          />
                        </ListItem>
                        {index < categories.length - 2 && (
                          <Divider component="li" />
                        )}
                      </React.Fragment>
                    ))}
                </List>
              </Paper>
            </motion.div>

            {/* Popular Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  mb: 4,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Popular Posts
                </Typography>
                <List disablePadding>
                  {popularPosts.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <ListItem
                        component={Link}
                        to={`/blog/${post.id}`}
                        sx={{
                          px: 0,
                          py: 2,
                          display: "flex",
                          alignItems: "flex-start",
                          textDecoration: "none",
                          color: "inherit",
                          transition: "background-color 0.2s ease",
                          "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.02)",
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={post.image}
                            sx={{
                              width: 80,
                              height: 60,
                              borderRadius: 1,
                              mr: 1,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {post.title}
                            </Typography>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <CalendarTodayIcon sx={{ fontSize: 12 }} />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {post.date}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < popularPosts.length - 1 && (
                        <Divider component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </motion.div>

            {/* Authors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Our Authors
                </Typography>
                <Grid container spacing={2}>
                  {[...new Set(blogPosts.map((post) => post.author))]
                    .slice(0, 4)
                    .map((author, index) => {
                      const authorData = blogPosts.find(
                        (post) => post.author === author
                      );
                      return (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            <Avatar
                              src={authorData.authorAvatar}
                              sx={{ width: 64, height: 64, mb: 1 }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600 }}
                            >
                              {author}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Writer
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            right: -50,
            bottom: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 0,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: -50,
            top: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Ready to Book Your Field?
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, maxWidth: 700, mx: "auto", opacity: 0.9 }}
              >
                Put the knowledge from our blog into practice by booking a
                football field for your next game or practice session.
              </Typography>
              <Button
                component={Link}
                to="/fields"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Browse Fields
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Blog;
