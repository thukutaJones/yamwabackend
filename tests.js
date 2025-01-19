const programs = [
  {
    name: "BIOMEDICAL SCIENCES",
    codes: [
      { name: "BSBS11" },
      { name: "BSBS23" },
      { name: "BSBS35" },
      { name: "BSBS47" },
    ],
  },
  {
    name: "NURSING AND MIDWIFERY",
    codes: [{ name: "BSNM11" }],
  },
  {
    name: "OPTOMETRY",
    codes: [{ name: "BOPT11" }],
  },
  {
    name: "COMMUNICATION STUDIE",
    codes: [
      { name: "BACS11" },
      { name: "BACS23" },
      { name: "BACS35" },
      { name: "BACS47" },
    ],
  },
  {
    name: "DEVELOPMENT STUDIES",
    codes: [
      { name: "BDEV11" },
      { name: "BDEV23" },
      { name: "BDEV35" },
      { name: "BDEV47" },
    ],
  },
  {
    name: "HISTORY AND HERITAGE STUDIES",
    codes: [
      { name: "BHHS11" },
      { name: "BHHS23" },
      { name: "BHHS35" },
      { name: "BHHS47" },
    ],
  },
  {
    name: "INTERNATIONAL RELATIONS AND DIPLOMACY",
    codes: [
      { name: "BIRD11" },
      { name: "BIRD23" },
      { name: "BIRD35" },
      { name: "BIRD47" },
    ],
  },
  {
    name: "POLITICS AND GOVERNANCE",
    codes: [
      { name: "BPOL11" },
      { name: "BPOL23" },
      { name: "BPOL35" },
      { name: "BPOL47" },
    ],
  },
  {
    name: "LIBRARY AND INFORMATION SCIENCE",
    codes: [
      { name: "BLIS11" },
      { name: "BLIS23" },
      { name: "BLIS35" },
      { name: "BLIS47" },
    ],
  },
  {
    name: "THEOLOGY AND RELIGIOUS STUDIES",
    codes: [
      { name: "BTRS11" },
      { name: "BTRS23" },
      { name: "BTRS35" },
      { name: "BTRS47" },
    ],
  },
  {
    name: "EDUCATION (ARTS)",
    codes: [
      { name: "BEDA11" },
      { name: "BEDA/BEDL/BEDF23" },
      { name: "BEDA/BEDL/BEDF35" },
      { name: "BEDA/BEDL/BEDF47" },
    ],
  },
  {
    name: "EDUCATION (LANGUAGES)",
    codes: [
      { name: "BEDL11" },
      { name: "BEDA/BEDL/BEDF23" },
      { name: "BEDA/BEDL/BEDF35" },
      { name: "BEDA/BEDL/BEDF47" },
    ],
  },
  {
    name: "EDUCATION (SCIENCE)",
    codes: [
      { name: "BEDS11" },
      { name: "BEDS23" },
      { name: "BEDS35" },
      { name: "BEDS47" },
    ],
  },
  {
    name: "FISHERIES AND AQUATIC SCIENCES",
    codes: [
      { name: "BSFS11" },
      { name: "BSFS23" },
      { name: "BSFS35" },
      { name: "BSFS47" },
    ],
  },
  {
    name: "FORESTRY AND ENVIRONMENTAL MANAGEMENT",
    codes: [
      { name: "BSCF11" },
      { name: "BSCF23" },
      { name: "BSCF35" },
      { name: "BSCF47" },
    ],
  },
  {
    name: "LAND MANAGEMENT (ESTATE MANAGEMENT)",
    codes: [
      { name: "BLME11" },
      { name: "BLME23" },
      { name: "BLME35" },
      { name: "BLME47" },
    ],
  },
  {
    name: "LAND MANAGEMENT (PHYSICAL PLANNING)",
    codes: [
      { name: "BLMP11" },
      { name: "BLMP23" },
      { name: "BLMP35" },
      { name: "BLMP47" },
    ],
  },
  {
    name: "TRANSFORMATIVE COMMUNITY DEVELOPMENT",
    codes: [
      { name: "BTCD11" },
      { name: "BTCD23" },
      { name: "BTCD35" },
      { name: "BTCD47" },
    ],
  },
  {
    name: "VALUE CHAIN AGRICULTURE",
    codes: [
      { name: "BVCA11" },
      { name: "BVCA23" },
      { name: "BVCA35" },
      { name: "BVCA47" },
    ],
  },
  {
    name: "WATER RESOURCES MANAGEMENT AND DEVELOPMENT",
    codes: [
      { name: "BSWR11" },
      { name: "BSWR23" },
      { name: "BSWR35" },
      { name: "BSWR47" },
    ],
  },
  {
    name: "INFORMATION AND COMMUNICATION TECHNOLOGY",
    codes: [
      { name: "BICT11" },
      { name: "BICT23" },
      { name: "BICT35" },
      { name: "BICT47" },
    ],
  },
  {
    name: "RENEWABLE ENERGY TECHNOLOGIES",
    codes: [
      { name: "BRESE11" },
      { name: "BRET23 / BRETU23" },
      { name: "BRET35" },
      { name: "BRET47" },
    ],
  },
  {
    name: "CHEMISTRY",
    codes: [
      { name: "BSC CHEMISTRY11" },
      { name: "BSC CHEMISTRY23" },
      { name: "BSC CHEMISTRY35" },
      { name: "BSC CHEMISTRY47" },
    ],
  },
  {
    name: "DATA SCIENCE",
    codes: [
      { name: "BSC DATA SCIENCE11" },
      { name: "BSC DATA SCIENCE23" },
      { name: "BSC DATA SCIENCE35" },
      { name: "BSC DATA SCIENCE47" },
    ],
  },
  {
    name: "MATHEMATICAL SCIENCES",
    codes: [
      { name: "BSC MATH SC11" },
      { name: "BSC MATH SC23" },
      { name: "BSC MATH SC35" },
      { name: "BSC MATH SC47" },
    ],
  },
  {
    name: "PHYSICS AND ELECTRONICS",
    codes: [
      { name: "BSC PHYSICS11" },
      { name: "BSC PHYSICS23" },
      { name: "BSC PHYSICS35" },
      { name: "BSC PHYSICS47" },
    ],
  },
  {
    name: "SPORTS MANAGEMENT",
    codes: [{ name: "BASM11" }],
  },
  {
    name: "CULTURE AND HERITAGE TOURISM",
    codes: [
      { name: "BCHT11" },
      { name: "BCHT23" },
      { name: "BCHT35" },
      { name: "BCHT47" },
    ],
  },
  {
    name: "CULINARY ARTS",
    codes: [
      { name: "BCUL11" },
      { name: "BCUL23" },
      { name: "BCUL35" },
      { name: "BCUL47" },
    ],
  },
  {
    name: "HOSPITALITY MANAGEMENT",
    codes: [
      { name: "BSHM11" },
      { name: "BSHM23" },
      { name: "BSHM35" },
      { name: "BSHM47" },
    ],
  },
  {
    name: "TOURISM",
    codes: [
      { name: "BSTO11" },
      { name: "BSTO23" },
      { name: "BSTO35" },
      { name: "BSTO47(ST)" },
      { name: "BSTO47(T&T)" },
    ],
  },
];

const mongoose = require("mongoose");
const app = require("./app");
const Program = require("./models/programs.model");

const port = process.env.PORT || 7000;

const addProgram = async (program) => {
  try {
    await Program.create(program);
    console.log(program, " Added");
  } catch (error) {
    console.log(error);
  }
};

console.log(programs.length);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(async () => {
    for (const program of programs) {
      await addProgram(program);
      // console.log(program)
    }
  })
  .catch((error) => {
    console.log(`Error connecting database: ${error}`);
  });
