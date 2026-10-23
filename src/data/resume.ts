export type PortfolioItem = {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  details: string[];
  tags?: string[];
};

export type PortfolioSection = {
  id: string;
  title: string;
  kind: 'experience' | 'education' | 'projects' | 'skills' | 'achievements' | 'certifications' | 'languages' | 'interests' | 'custom';
  items: PortfolioItem[];
};

export type PortfolioProfile = {
  name: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  sections: PortfolioSection[];
};

export const originalResume: PortfolioProfile = {
  name: 'Soumen Roy',
  headline: 'Electronics & Communication Engineering · Embedded Systems · Robotics · Mathematics',
  location: 'Barrackpore, West Bengal, India',
  phone: '+91 7439608300',
  email: 'soumenr732@gmail.com',
  summary:
    'Electronics and Communication Engineering undergraduate with a B.Sc. (Hons.) in Mathematics and hands-on experience in embedded systems, Raspberry Pi-based development, robotics, and AI-assisted engineering projects. Proficient in C and C++, with practical exposure to Linux environments, hardware interfacing, real-time systems, and foundational cybersecurity tools. Strong analytical and mathematical background with experience in interdisciplinary engineering projects and hackathons involving embedded systems, robotics, computer vision, geospatial problem-solving, and AI-assisted development.',
  sections: [
    {
      id: 'experience',
      title: 'Experience',
      kind: 'experience',
      items: [
        {
          id: 'emertxe-intern',
          title: 'Embedded Systems Intern',
          subtitle: 'EMERTXE',
          period: '02 June 2026 – 03 July 2026',
          details: [
            'Worked on a Real-Time Electric Vehicle Dashboard and ADAS Warning System.',
            'Applied C/C++ and embedded-systems concepts to real-time system development.',
            'Gained practical exposure to hardware interfacing, sensor-driven functionality, debugging, and system integration.',
            'Worked with real-time processing concepts for automotive-oriented applications.',
            'Translated system requirements into functional embedded-system modules.',
          ],
          tags: ['C/C++', 'Embedded systems', 'Real-time', 'Automotive'],
        },
        {
          id: 'math-sme',
          title: 'Real-Time Doubt Solving / Subject Matter Expert – Mathematics',
          subtitle: 'LearnAsYouGo Private Limited · Internshala',
          period: 'Completed 04 February 2023',
          details: [
            'Provided real-time mathematics doubt-solving and subject-matter assistance.',
            'Solved mathematical problems while explaining concepts clearly and systematically.',
            'Strengthened analytical reasoning, problem-solving, and technical communication skills.',
          ],
          tags: ['Mathematics', 'Problem solving', 'Communication'],
        },
      ],
    },
    {
      id: 'education',
      title: 'Education',
      kind: 'education',
      items: [
        {
          id: 'btech',
          title: 'B.Tech. in Electronics and Communication Engineering',
          subtitle: 'Adamas University',
          period: '2024 – Expected 2028 · Currently pursuing',
          details: [],
          tags: ['Electronics', 'Communication engineering'],
        },
        {
          id: 'bsc-math',
          title: 'B.Sc. (Hons.) in Mathematics',
          subtitle: 'Adamas University',
          period: '2020 – 2023',
          details: ['CGPA: 8.62 / 10'],
          tags: ['Mathematics'],
        },
        {
          id: 'class-xii',
          title: 'Class XII · CBSE',
          subtitle: 'Army School Bikaner',
          period: '2020',
          details: ['80%'],
          tags: [],
        },
        {
          id: 'class-x',
          title: 'Class X · CBSE',
          subtitle: 'Army School Bikaner',
          period: '2018',
          details: ['82.6%'],
          tags: [],
        },
      ],
    },
    {
      id: 'projects',
      title: 'Selected projects',
      kind: 'projects',
      items: [
        {
          id: 'fo-alpha',
          title: 'FO-ALPHA-01',
          subtitle: 'Offline Communication & Perimeter-Monitoring Hub',
          period: '2026',
          description: 'A Raspberry Pi-based local communication and perimeter-monitoring system designed to operate without continuous internet connectivity.',
          details: [
            'Integrated PIR and ultrasonic sensors for movement and proximity-based event detection.',
            'Implemented multithreaded processing for concurrent system functions.',
            'Developed a local monitoring dashboard using Flask and JavaScript, with AI-assisted development during implementation.',
            'Worked on sensor interfacing, signal-conditioning considerations, and hardware protection.',
            'Designed the system for local wireless access and multi-device monitoring.',
            'Focused on real-time event detection, reliability, and practical deployment.',
          ],
          tags: ['Raspberry Pi', 'PIR', 'Ultrasonic', 'Flask', 'JavaScript', 'Multithreading'],
        },
        {
          id: 'route-resilience',
          title: 'Route Resilience',
          subtitle: 'Bhartiya Antariksh Hackathon · ISRO',
          period: '2026',
          description: 'A road-network resilience problem involving AI-assisted computer vision and geospatial analysis.',
          details: [
            'Explored approaches for analysing road networks and identifying critical transportation links.',
            'Applied mathematical and graph-based concepts to understand network connectivity and critical road segments.',
            'Used AI-assisted development during implementation while contributing to system design, problem-solving, and evaluation.',
            'Combined mathematical reasoning with engineering and computational approaches to address the problem.',
          ],
          tags: ['Computer vision', 'Geospatial analysis', 'Graph theory', 'Hackathon'],
        },
        {
          id: 'mars-rover',
          title: 'Autonomous Surveillance Mars Rover',
          subtitle: 'Smart India Hackathon',
          period: '2024',
          description: 'An autonomous surveillance rover involving embedded systems, sensing, robotics, and autonomous operation.',
          details: [
            'Contributed to a robotic system designed for surveillance and navigation in challenging environments.',
            'Applied concepts related to sensor integration, autonomous movement, embedded control, and robotic systems.',
            'Used AI-assisted development while contributing to system design, testing, and problem-solving.',
            'Collaborated within a multidisciplinary hackathon team to develop a practical engineering solution.',
          ],
          tags: ['Robotics', 'Sensors', 'Embedded control', 'Autonomy'],
        },
      ],
    },
    {
      id: 'skills',
      title: 'Technical skills',
      kind: 'skills',
      items: [
        { id: 'programming', title: 'Programming', details: ['C', 'C++'], tags: ['C', 'C++'] },
        {
          id: 'embedded-hardware',
          title: 'Embedded Systems & Hardware',
          details: ['Embedded Systems', 'Raspberry Pi', 'Sensor Interfacing', 'Real-Time Systems', 'Multithreading', 'Hardware–Software Integration', 'Embedded Debugging'],
          tags: ['Raspberry Pi', 'Sensors', 'Real-time', 'Debugging'],
        },
        { id: 'operating-systems', title: 'Operating Systems', details: ['Raspberry Pi OS', 'Kali Linux', 'Windows'], tags: ['Linux', 'Windows'] },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity & Networking',
          details: ['Nmap – Basic Hands-on Experience', 'Wireshark – Basic Hands-on Experience', 'Metasploit – Basic Hands-on Experience', 'Networking Fundamentals', 'Basic Network Analysis'],
          tags: ['Nmap', 'Wireshark', 'Metasploit'],
        },
        { id: 'engineering-design', title: 'Engineering & Design', details: ['KiCad', 'FreeCAD'], tags: ['KiCad', 'FreeCAD'] },
        {
          id: 'project-exposure',
          title: 'Project Exposure',
          details: ['Robotics', 'AI-Assisted Engineering', 'Computer Vision', 'Geospatial Analysis', 'Autonomous Systems', 'Real-Time Monitoring Systems'],
          tags: ['Robotics', 'Computer vision', 'Autonomous systems'],
        },
      ],
    },
    {
      id: 'leadership',
      title: 'Leadership & achievements',
      kind: 'achievements',
      items: [
        {
          id: 'team-leader',
          title: 'Team Leader · Hackathons',
          details: ['Served as team leader in two hackathons, coordinating technical work, problem-solving, collaboration, and project presentation.'],
          tags: ['Team leadership', 'Hackathons'],
        },
        {
          id: 'imo-gold',
          title: 'Gold Medal · International Mathematics Olympiad',
          details: ['Awarded a Gold Medal at the school level.'],
          tags: ['Mathematics'],
        },
        {
          id: 'ieee-member',
          title: 'IEEE Member',
          details: ['IEEE membership obtained on 27 August 2026, valid through 31 December 2027.'],
          tags: ['IEEE'],
        },
      ],
    },
    {
      id: 'certifications',
      title: 'Certifications & training',
      kind: 'certifications',
      items: [
        {
          id: 'cybersecurity-training',
          title: 'Cybersecurity Training',
          details: [
            'Completed cybersecurity-related training and certification programs with foundational practical exposure.',
            'Developed basic hands-on familiarity with Nmap, Wireshark, and Metasploit in controlled learning environments.',
            'Gained exposure to networking, reconnaissance, network-traffic analysis, and security-testing fundamentals.',
          ],
          tags: ['Cybersecurity', 'Networking', 'Traffic analysis'],
        },
      ],
    },
    {
      id: 'languages',
      title: 'Languages',
      kind: 'languages',
      items: [
        { id: 'english', title: 'English', subtitle: 'Professional proficiency', details: [], tags: ['Professional'] },
        { id: 'hindi', title: 'Hindi', subtitle: 'Professional proficiency', details: [], tags: ['Professional'] },
        { id: 'bengali', title: 'Bengali', subtitle: 'Basic', details: [], tags: ['Basic'] },
        { id: 'russian', title: 'Russian', subtitle: 'Basic', details: [], tags: ['Basic'] },
      ],
    },
    {
      id: 'interests',
      title: 'Areas of interest',
      kind: 'interests',
      items: [
        {
          id: 'focus-areas',
          title: 'Engineering interests',
          details: [],
          tags: ['Embedded Systems', 'Robotics', 'Autonomous Systems', 'Real-Time Systems', 'Electronics', 'Computer Vision', 'AI-Assisted Engineering', 'Cybersecurity', 'Mathematical Modelling', 'Hardware–Software Integration'],
        },
      ],
    },
  ],
};
