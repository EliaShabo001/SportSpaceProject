import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SchoolIcon from "@mui/icons-material/School";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import "../App.css";

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

const Careers = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    experience: "",
  });

  // Job listings data
  const jobListings = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      posted: "2 weeks ago",
      description:
        "We are looking for a Full Stack Developer to join our engineering team and help build and maintain our booking platform. The ideal candidate will have experience with React, Node.js, and database technologies.",
      responsibilities: [
        "Develop and maintain our web application using React and Node.js",
        "Work with our database team to design and implement efficient data models",
        "Collaborate with the product team to implement new features",
        "Write clean, maintainable, and well-documented code",
        "Participate in code reviews and help maintain code quality",
      ],
      requirements: [
        "3+ years of experience in full stack development",
        "Proficiency in React, Node.js, and modern JavaScript",
        "Experience with SQL and NoSQL databases",
        "Understanding of RESTful APIs and microservices architecture",
        "Familiarity with version control systems (Git)",
        "Bachelor degree in Computer Science or related field (or equivalent experience)",
      ],
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "We are seeking a talented UX/UI Designer to create amazing user experiences for our platform. The ideal candidate will have a strong portfolio demonstrating their ability to create intuitive and visually appealing interfaces.",
      responsibilities: [
        "Design user interfaces for our web and mobile applications",
        "Create wireframes, prototypes, and high-fidelity mockups",
        "Conduct user research and usability testing",
        "Collaborate with developers to ensure proper implementation of designs",
        "Stay up-to-date with the latest design trends and best practices",
      ],
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
        "Strong portfolio showcasing your design process and solutions",
        "Understanding of user-centered design principles",
        "Experience with responsive design and mobile interfaces",
        "Excellent communication and collaboration skills",
      ],
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      posted: "3 days ago",
      description:
        "We are looking for a Marketing Manager to lead our marketing efforts and help grow our user base. The ideal candidate will have experience in digital marketing, content creation, and campaign management.",
      responsibilities: [
        "Develop and implement marketing strategies to increase brand awareness",
        "Manage digital marketing campaigns across various channels",
        "Create and oversee content creation for our blog and social media",
        "Analyze marketing metrics and adjust strategies accordingly",
        "Collaborate with the product team to align marketing efforts with product goals",
      ],
      requirements: [
        "5+ years of experience in marketing, preferably in SaaS or sports industry",
        "Experience with digital marketing channels (social media, email, SEO)",
        "Strong analytical skills and experience with marketing analytics tools",
        "Excellent written and verbal communication skills",
        "Bachelor degree in Marketing, Business, or related field",
        "Experience managing a team is a plus",
      ],
    },
    {
      id: 4,
      title: "Customer Support Specialist",
      department: "Customer Success",
      location: "Remote",
      type: "Part-time",
      posted: "5 days ago",
      description:
        "We are seeking a Customer Support Specialist to help our users have the best experience possible with our platform. The ideal candidate will be patient, empathetic, and have excellent communication skills.",
      responsibilities: [
        "Respond to customer inquiries via email, chat, and phone",
        "Troubleshoot and resolve customer issues in a timely manner",
        "Document customer feedback and share it with the product team",
        "Create and maintain support documentation and FAQs",
        "Provide onboarding assistance to new users",
      ],
      requirements: [
        "2+ years of experience in customer support or related role",
        "Excellent written and verbal communication skills",
        "Ability to explain technical concepts in simple terms",
        "Experience with helpdesk or customer support software",
        "Patient and empathetic attitude towards customers",
        "Availability to work some weekend hours",
      ],
    },
  ];

  // Benefits data
  const benefits = [
    {
      icon: (
        <HealthAndSafetyIcon sx={{ fontSize: 40, color: "primary.main" }} />
      ),
      title: "Health & Wellness",
      description:
        "Comprehensive health, dental, and vision insurance for you and your dependents.",
    },
    {
      icon: (
        <WorkspacePremiumIcon sx={{ fontSize: 40, color: "primary.main" }} />
      ),
      title: "Competitive Salary",
      description:
        "We offer competitive compensation packages with performance-based bonuses.",
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Flexible Work",
      description:
        "Remote work options and flexible schedules to maintain work-life balance.",
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Team Events",
      description:
        "Regular team outings, sports events, and company retreats to foster team spirit.",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Learning & Development",
      description:
        "Professional development budget and opportunities to learn and grow.",
    },
  ];

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setApplyDialogOpen(true);
  };

  const handleCloseApplyDialog = () => {
    setApplyDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend here
    console.log("Application submitted:", {
      ...formData,
      jobId: selectedJob.id,
    });

    // Close dialog and reset form
    setApplyDialogOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
      experience: "",
    });
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
                Join Our{" "}
                <span style={{ color: theme.palette.primary.main }}>Team</span>
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
                Build your career at SportSpace and help us revolutionize how
                people book and play sports.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Why Join Us Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Why Join SportSpace?
              </Typography>
              <Typography variant="body1" paragraph>
                At SportSpace, we're passionate about sports and technology.
                We're building a platform that makes it easy for people to find
                and book sports facilities, and we're looking for talented
                individuals to join our team.
              </Typography>
              <Typography variant="body1" paragraph>
                We offer a dynamic work environment where you can make a real
                impact, grow professionally, and be part of a mission-driven
                company that's changing how people access sports facilities.
              </Typography>
              <List>
                {[
                  "Innovative and fast-growing startup",
                  "Collaborative and inclusive culture",
                  "Opportunity to make a real impact",
                  "Work with cutting-edge technologies",
                  "Passionate and talented team members",
                ].map((item, index) => (
                  <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                component="img"
                src="https://source.unsplash.com/random/600x400/?office,team"
                alt="Our team"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 4,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: "center",
            }}
          >
            Benefits & Perks
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              textAlign: "center",
              color: "text.secondary",
              mb: 6,
            }}
          >
            We take care of our team with competitive benefits and a great work
            environment
          </Typography>
        </motion.div>
        <div className="ourvalue" style={{ margin: "20px" }}>
          <Grid container spacing={4} gap={15}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      borderRadius: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>

      {/* Open Positions Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: "center",
            }}
          >
            Open Positions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              textAlign: "center",
              color: "text.secondary",
              mb: 6,
            }}
          >
            Join our team and help us build the future of sports facility
            booking
          </Typography>
        </motion.div>

        <Box sx={{ mb: 4 }}>
          {jobListings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion
                expanded={expanded === `panel${job.id}`}
                onChange={handleAccordionChange(`panel${job.id}`)}
                sx={{
                  mb: 2,
                  borderRadius:
                    expanded === `panel${job.id}`
                      ? "16px 16px 16px 16px"
                      : "16px",
                  overflow: "hidden",
                  "&:before": {
                    display: "none",
                  },
                  boxShadow:
                    expanded === `panel${job.id}`
                      ? "0 10px 30px rgba(0, 0, 0, 0.1)"
                      : "0 2px 10px rgba(0, 0, 0, 0.05)",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor:
                      expanded === `panel${job.id}`
                        ? "rgba(255, 106, 0, 0.05)"
                        : "transparent",
                    "& .MuiAccordionSummary-content": {
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      gap: 2,
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {job.title}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                    >
                      <Chip
                        icon={<WorkIcon />}
                        label={job.department}
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                      />
                      <Chip
                        icon={<LocationOnIcon />}
                        label={job.location}
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                      />
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={job.type}
                        size="small"
                        sx={{ bgcolor: "background.paper" }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Posted {job.posted}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(job);
                      }}
                      sx={{ display: { xs: "none", md: "block" } }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3 }}>
                  <Typography variant="body1" paragraph>
                    {job.description}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mt: 3, mb: 2 }}
                  >
                    Responsibilities:
                  </Typography>
                  <List sx={{ mb: 3 }}>
                    {job.responsibilities.map((item, idx) => (
                      <ListItem key={idx} sx={{ p: 0, mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mt: 3, mb: 2 }}
                  >
                    Requirements:
                  </Typography>
                  <List sx={{ mb: 3 }}>
                    {job.requirements.map((item, idx) => (
                      <ListItem key={idx} sx={{ p: 0, mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleApplyClick(job)}
                      sx={{ px: 4 }}
                    >
                      Apply for this Position
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
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
                Don't See the Right Fit?
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, maxWidth: 700, mx: "auto", opacity: 0.9 }}
              >
                We're always looking for talented individuals to join our team.
                Send us your resume and we'll keep you in mind for future
                opportunities.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 4, py: 1.5 }}
                onClick={() => {
                  setSelectedJob({
                    title: "General Application",
                    id: "general",
                  });
                  setApplyDialogOpen(true);
                }}
              >
                Send General Application
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Application Dialog */}
      <Dialog
        open={applyDialogOpen}
        onClose={handleCloseApplyDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            Apply for {selectedJob?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please fill out the form below to apply for this position. All
            fields marked with * are required.
          </Typography>

          <form onSubmit={handleSubmitApplication}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Years of Experience</InputLabel>
                  <Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleFormChange}
                    label="Years of Experience"
                  >
                    <MenuItem value="0-1">0-1 years</MenuItem>
                    <MenuItem value="1-3">1-3 years</MenuItem>
                    <MenuItem value="3-5">3-5 years</MenuItem>
                    <MenuItem value="5-10">5-10 years</MenuItem>
                    <MenuItem value="10+">10+ years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<AttachFileIcon />}
                  sx={{ mb: 1 }}
                >
                  Upload Resume *
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </Button>
                <Typography variant="body2" color="text.secondary">
                  {formData.resume
                    ? `Selected file: ${formData.resume.name}`
                    : "No file selected (PDF, DOC, DOCX)"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Cover Letter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleFormChange}
                  placeholder="Tell us why you're interested in this position and why you'd be a good fit."
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseApplyDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitApplication}
            endIcon={<SendIcon />}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Careers;
