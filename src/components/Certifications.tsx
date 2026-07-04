import React, { useState, useRef } from "react";
import { Award, BookOpen, ShieldCheck, Sparkles, Terminal, Layers, Download, Calendar, RotateCw } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Certification } from "../data";

interface TiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function TiltWrapper({ children, className = "", onClick }: TiltWrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  const glareOpacity = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
    glareOpacity.set(0.12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      whileHover={{ 
        scale: 1.018,
        boxShadow: "0px 20px 40px rgba(59, 130, 246, 0.15)"
      }}
      className={`relative w-full h-full rounded-2xl cursor-pointer select-none ${className}`}
    >
      {/* Glare spotlight layer */}
      <motion.div
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle 160px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.1), transparent)`
          ),
          opacity: glareOpacity,
        }}
        className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay rounded-2xl"
      />
      
      {/* Outer subtle glow highlight layer */}
      <motion.div 
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle 260px at ${gx}% ${gy}%, rgba(59, 130, 246, 0.18), transparent)`
          ),
          opacity: glareOpacity,
        }}
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
      />

      {children}
    </motion.div>
  );
}

interface CertificationsProps {
  certs: Certification[];
}

export default function Certifications({ certs }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeFlippedIndex, setActiveFlippedIndex] = useState<string | null>(null);

  // Divide certificates into courses (upside) and internships (downward)
  const courseCerts = certs.filter(c => c.type === "course");
  const internshipCerts = certs.filter(c => c.type === "internship");

  // Replicate list once to ensure continuous smooth scrolling without empty gaps and perfect alignment
  const loopCourses = [...courseCerts, ...courseCerts];
  const loopInternships = [...internshipCerts, ...internshipCerts];

  const handlePrintCertificate = (cert: Certification) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print/save certificate.");
      return;
    }

    const certName = cert.name.toLowerCase();
    let specificStyles = "";
    let certLayoutHtml = "";

    if (certName.includes("fmml") || certName.includes("hyderabad")) {
      specificStyles = "border: 20px double #854d0e; background-color: #fefaf0; color: #1c1917;";
      certLayoutHtml = `
        <div style="text-align: center; font-size: 14px; text-transform: uppercase; font-weight: bold; color: #78350f; margin-bottom: 20px;">iiit hyderabad ihub-data</div>
        <h1 style="text-align: center; font-family: serif; font-size: 38px; font-weight: 900; margin-bottom: 30px; text-transform: uppercase;">Certificate of Proficiency</h1>
        <p style="text-align: center; font-style: italic; font-size: 16px;">This is to certify that</p>
        <p style="text-align: center; font-size: 32px; font-weight: 950; text-decoration: underline; color: #451a03; margin: 20px 0;">CHEBOLU GAYATRI</p>
        <p style="text-align: center; font-size: 16px; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          Has successfully completed the advanced course in <strong style="font-size: 18px;">Foundations of Modern Machine Learning (FMML)</strong> online training program, securing <strong>Grade A</strong> evaluation rating.
        </p>
        <p style="text-align: center; font-size: 14px; margin-top: 30px; color: #666;">Conducted from: 19 August 2023 to 11 May 2024</p>
        <div style="margin-top: 80px; display: flex; justify-content: space-between; padding: 0 40px; font-family: serif;">
          <div>
            <div style="border-bottom: 1px solid #999; width: 180px; font-style: italic; font-size: 18px;">C K Raju</div>
            <div style="font-size: 12px; margin-top: 5px; color: #666;">Head (Programs), iHub-Data</div>
          </div>
          <div>
            <div style="font-weight: bold; padding: 10px; border: 1px solid #78350f; font-size: 11px;">IIITH VERIFIED</div>
          </div>
          <div>
            <div style="border-bottom: 1px solid #999; width: 180px; font-style: italic; font-size: 18px;">Monalisa P</div>
            <div style="font-size: 12px; margin-top: 5px; color: #666;">Course Instructor, IIIT-H</div>
          </div>
        </div>
      `;
    } else if (certName.includes("ibm") || certName.includes("edunet")) {
      specificStyles = "border: 15px solid #1e293b; background-color: #f8fafc; color: #0f172a;";
      certLayoutHtml = `
        <div style="background-color: #1e1e1e; color: white; padding: 15px; margin: -40px -40px 40px -40px; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin: 0; font-family: sans-serif; tracking: 2px;">IBM SkillsBuild</h2>
          <span style="font-size: 12px; font-family: monospace;">COMPLETION CERTIFICATE</span>
        </div>
        <p style="text-align: center; font-size: 18px; color: #64748b;">This certificate is presented to</p>
        <h1 style="text-align: center; font-size: 42px; font-weight: 900; letter-spacing: 2px; color: #0f172a; margin: 30px 0;">CHEBOLU GAYATRI</h1>
        <p style="text-align: center; font-size: 18px; color: #64748b;">for the successful completion of</p>
        <h2 style="text-align: center; font-size: 28px; color: #312e81; font-weight: bold; margin: 20px 0;">Edunet - Artificial Intelligence</h2>
        <p style="text-align: center; font-family: monospace; font-size: 14px; color: #475569;">Verifiable Plan ID: PLAN-8A48645196FA</p>
        <p style="text-align: center; font-size: 14px; margin-top: 40px; color: #94a3b8;">Completion date: 17 Dec 2025</p>
        
        <div style="margin-top: 60px; display: flex; justify-content: space-around; align-items: center;">
          <div style="text-align: left;">
            <div style="border-bottom: 1px dotted #ccc; width: 180px; height: 30px; font-style: italic;">IBM SkillsBuild Team</div>
            <div style="font-size: 11px; margin-top: 5px; color: #94a3b8;">Education Partner, IBM</div>
          </div>
          <div style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #e2e8f0; font-size: 40px; text-align: center; line-height: 70px;">🏆</div>
        </div>
      `;
    } else if (certName.includes("techsaksham") || certName.includes("applied artificial")) {
      specificStyles = "border: 15px solid #0284c7; background-color: #ffffff; color: #0f172a;";
      certLayoutHtml = `
        <h1 style="text-align: center; color: #0284c7; font-size: 34px; text-transform: uppercase; margin-bottom: 5px;">Certificate of Achievement</h1>
        <h3 style="text-align: center; color: #0369a1; margin-top: 0; font-size: 16px; tracking: 1px;">MICROSOFT & SAP JOINT CSR PROGRAM</h3>
        <p style="text-align: center; font-style: italic; margin-top: 30px; color: #64748b;">This certificate is proudly completed by</p>
        <h2 style="text-align: center; font-size: 28px; border-bottom: 1px solid #ccc; width: 300px; margin: 10px auto; color: #0f172a;">GAYATRI CHEBOLU</h2>
        <p style="text-align: center; font-size: 16px; max-width: 600px; margin: 25px auto; line-height: 1.6; color: #334155;">
          for successful participation and completion of the certification course in <strong style="color: #0284c7;">Applied Artificial Intelligence: Practical Implementations</strong> under the TechSaksham program implemented by Edunet Foundation (2024-25).
        </p>
        <p style="text-align: center; font-family: monospace; font-size: 12px; color: #64748b;">Verifiable Verification Code: TSPIN25_590292</p>
        
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: bottom; padding: 0 40px;">
          <div>
            <div style="border-bottom: 1px solid #94a3b8; width: 180px; font-style: italic; font-size: 18px;">Edunet Foundation Team</div>
            <div style="font-size: 11px; margin-top: 5px; color: #64748b;">TechSaksham Lead Evaluator</div>
          </div>
          <div style="display: flex; gap: 15px;">
            <div style="border: 1px solid #ccc; padding: 5px; font-size: 9px; font-weight: bold; background-color: #f8fafc;">MICROSOFT APPROVED</div>
          </div>
        </div>
      `;
    } else if (certName.includes("career management")) {
      specificStyles = "border: 15px solid #1e293b; background-color: #0f172a; color: #f8fafc;";
      certLayoutHtml = `
        <div style="background-color: #0284c7; color: white; padding: 15px; margin: -40px -40px 40px -40px; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin: 0; font-family: sans-serif; tracking: 2px;">IBM SkillsBuild</h2>
          <span style="font-size: 12px; font-family: monospace;">COURSE COMPLETION</span>
        </div>
        <p style="text-align: center; font-size: 18px; color: #94a3b8;">This certificate is presented to</p>
        <h1 style="text-align: center; font-size: 38px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin: 30px 0;">GAYATRI CHEBOLU</h1>
        <p style="text-align: center; font-size: 18px; color: #94a3b8;">for the successful completion of</p>
        <h2 style="text-align: center; font-size: 24px; color: #38bdf8; font-weight: bold; margin: 20px 0;">Career Management Essentials</h2>
        <p style="text-align: center; font-family: monospace; font-size: 14px; color: #94a3b8;">Verifiable Plan ID: IBM-CME-2025</p>
        
        <div style="margin-top: 60px; display: flex; justify-content: space-around; align-items: center;">
          <div style="text-align: left;">
            <div style="border-bottom: 1px dotted #ccc; width: 180px; height: 30px; font-style: italic; color: #cbd5e1;">IBM SkillsBuild Team</div>
            <div style="font-size: 11px; margin-top: 5px; color: #cbd5e1;">Global Education Lead, IBM</div>
          </div>
          <div style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #007cc3; font-size: 40px; text-align: center; line-height: 70px;">🏆</div>
        </div>
      `;
    } else if (certName.includes("forage") || certName.includes("bcg")) {
      specificStyles = "border-right: 35px solid #0f766e; border: 1px solid #e2e8f0; background-color: #ffffff; color: #1e293b;";
      certLayoutHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 40px;">
          <h2 style="margin: 0; color: #0f172a; font-size: 24px;">BCG X</h2>
          <span style="font-size: 18px; color: #0f766e; font-weight: bold;">Forage</span>
        </div>
        <h1 style="font-size: 44px; font-weight: 900; color: #0f172a; margin-bottom: 5px;">GAYATRI CHEBOLU</h1>
        <h3 style="font-size: 24px; color: #0f766e; margin-top: 0; margin-bottom: 30px;">GenAI Job Simulation</h3>
        <p style="font-size: 15px; line-height: 1.6; max-width: 650px; color: #475569; margin-bottom: 40px;">
          Successfully completed modular simulation tasks representing actual BCG X workloads: <br/>
          • Data extraction and initial analysis <br/>
          • Developing an AI-powered financial interactive chatbot
        </p>
        <p style="font-family: monospace; font-size: 12px; color: #94a3b8; margin-bottom: 80px;">Enrolment Verification Code: FHGoCeHpfDp8jupcW | User Code: ooi7JDahHtGKnPhe3</p>
        
        <div style="display: flex; justify-content: space-between; align-items: bottom;">
          <div>
            <div style="border-bottom: 1px solid #cbd5e1; width: 220px; font-style: italic; font-size: 18px; padding-bottom: 5px;">Tom Brunskill</div>
            <div style="font-size: 11px; margin-top: 5px; color: #94a3b8;">CEO, Co-Founder of Forage</div>
          </div>
          <span style="font-size: 13px; color: #94a3b8; font-family: monospace;">August 13th, 2025</span>
        </div>
      `;
    } else if (certName.includes("wadhwani") || certName.includes("jobready")) {
      specificStyles = "border: 15px double #f97316; background-color: #fffaf7; color: #1c1917;";
      certLayoutHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fed7aa; padding-bottom: 15px; margin-bottom: 30px;">
          <div>
            <h2 style="margin: 0; color: #ea580c; font-size: 20px;">WADHWANI FOUNDATION</h2>
            <p style="margin: 0; font-size: 10px; tracking: 3px; color: #7c2d12;">GLOBAL EMPLOYABILITY SKILLS</p>
          </div>
          <span style="font-weight: bold; background-color: #ea580c; color: white; padding: 5px 12px; font-size: 12px;">BASIC LEVEL</span>
        </div>
        <h1 style="text-align: center; font-size: 34px; font-family: serif; color: #c2410c; margin-bottom: 5px;">Certificate of Completion</h1>
        <p style="text-align: center; font-style: italic; color: #666; font-size: 15px;">This is to certify that</p>
        <h2 style="text-align: center; font-size: 28px; border-bottom: 1px solid #ffedd5; padding-bottom: 10px; width: 350px; margin: 15px auto;">GAYATRI CHEBOLU</h2>
        <p style="text-align: center; font-size: 16px; max-width: 580px; margin: 20px auto; line-height: 1.6; color: #431407;">
          from Eduskills Foundation has successfully completed <strong>JobReady: Employability Skills</strong> at the Basic Level, completing 79 dedicated hours of certified training on <strong>September 09, 2025</strong>.
        </p>
        
        <div style="margin-top: 80px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="border-bottom: 1px solid #a1a1aa; width: 180px; font-style: italic; font-size: 18px;">Ajay Kela</div>
            <div style="font-size: 11px; margin-top: 5px; color: #71717a;">CEO, Wadhwani Foundation</div>
          </div>
          <div style="font-weight: bold; border: 1px solid #f97316; padding: 10px; font-size: 11px;">WF VERIFIED ID: WF-BASIC-2025</div>
        </div>
      `;
    } else if (certName.includes("apexplanet") || certName.includes("web development")) {
      specificStyles = "border: 12px solid #065f46; background-color: #fefefe; color: #1e293b;";
      certLayoutHtml = `
        <h1 style="text-align: center; color: #065f46; font-size: 36px; text-transform: uppercase; margin-bottom: 5px;">Certificate of Completion</h1>
        <h3 style="text-align: center; color: #047857; margin-top: 0; font-size: 18px; tracking: 1px;">WEB DEVELOPMENT INTERNSHIP</h3>
        <p style="text-align: center; font-style: italic; margin-top: 40px; color: #64748b;">This is to certify that CC credential holder</p>
        <h2 style="text-align: center; font-size: 30px; border-bottom: 1px solid #ccc; width: 300px; margin: 10px auto; color: #0f172a;">GAYATRI CHEBOLU</h2>
        <p style="text-align: center; font-size: 16px; max-width: 600px; margin: 25px auto; line-height: 1.6; color: #334155;">
          has successfully completed a virtual internship in <strong style="color: #065f46;">Web Development with HTML, CSS, and JavaScript</strong> from <strong style="color: #065f46;">01 August, 2025 to 15 September, 2025</strong> at ApexPlanet Software Pvt. Ltd.
        </p>
        <p style="text-align: center; font-family: monospace; font-size: 12px; color: #64748b;">Verifiable Certificate ID: APSPL2513808</p>
        
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: bottom; padding: 0 20px;">
          <div>
            <div style="border-bottom: 1px solid #94a3b8; width: 180px; font-style: italic; font-size: 18px;">Kundan Kumar</div>
            <div style="font-size: 11px; margin-top: 5px; color: #64748b;">Founder & CEO, ApexPlanet Software</div>
          </div>
          <div style="display: flex; gap: 15px;">
            <div style="border: 1px solid #ccc; padding: 5px; font-size: 9px; font-weight: bold; background-color: #f8fafc;">AICTE APPROVED</div>
            <div style="border: 1px solid #ccc; padding: 5px; font-size: 9px; font-weight: bold; background-color: #f8fafc;">MSME SYSTEM</div>
          </div>
        </div>
      `;
    } else if (certName.includes("3skill") || certName.includes("aimi")) {
      specificStyles = "border: 14px solid #1d4ed8; background-color: #fafbfc; color: #1e293b;";
      certLayoutHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #1d4ed8; font-size: 32px; letter-spacing: 2px;">CERTIFICATE</h2>
          <p style="margin: 0; font-size: 12px; font-family: monospace; tracking: 3px; color: #64748b;">OF INTERNSHIP</p>
        </div>
        <p style="text-align: center; font-style: italic; color: #64748b;">is proudly presented to</p>
        <h1 style="text-align: center; font-size: 36px; font-weight: 900; color: #0d1b3e; margin: 15px 0;">GAYATRI CHEBOLU</h1>
        <p style="text-align: center; font-size: 16px; max-width: 580px; margin: 20px auto; line-height: 1.6; color: #334155;">
          for successfully completing a two-month virtual internship in the <strong style="color: #1d4ed8;">AIMI</strong> specialization program, gaining valuable hands-on experience, enhancing technical proficiency, and applying real-world knowledge.
        </p>
        <p style="text-align: center; font-family: monospace; color: #94a3b8;">INTERN ID: INTERN260042</p>
        
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: center; position: relative;">
          <div>
            <div style="border-bottom: 1px solid #94a3b8; width: 180px; font-style: italic; font-size: 18px;">S. Levin</div>
            <div style="font-size: 11px; margin-top: 5px; color: #64748b;">CEO, 3Skill India</div>
          </div>
          <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #dc2626; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; border: 2px solid #b91c1c; opacity: 0.85;">SEAL</div>
          <div>
            <div style="border-bottom: 1px solid #94a3b8; width: 180px; height: 18px; text-align: right;"></div>
            <div style="font-size: 11px; margin-top: 5px; color: #64748b; text-align: right;">COO, 3Skill</div>
          </div>
        </div>
      `;
    } else {
      specificStyles = "border-left: 20px solid #007cc3; border-right: 20px solid #007cc3; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; background-color: #ffffff; color: #0a192f;";
      certLayoutHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 40px;">
          <h2 style="margin: 0; color: #007cc3; font-size: 26px;">Infosys <span style="font-weight: 300; color: #64748b;">Springboard</span></h2>
          <span style="font-family: monospace; font-size: 12px; color: #64748b;">CERTIFICATE OF COMPLETION</span>
        </div>
        <p style="text-align: center; font-size: 16px; color: #64748b; margin-top: 40px;">This certificate of completion is presented to</p>
        <h1 style="text-align: center; font-size: 40px; font-weight: 950; color: #0a192f; margin: 20px 0;">GAYATRI CHEBOLU</h1>
        <p style="text-align: center; font-size: 16px; color: #64748b;">for actively participating in and completing the mandatory assignment related to</p>
        <h2 style="text-align: center; font-size: 22px; color: #007cc3; margin: 15px 0;">Internship 6.0 (B2) CodeGenie: AI Explainer and Code Generator</h2>
        <p style="text-align: center; font-size: 14px; color: #475569; margin-top: 30px;">Conducted from <strong>September 1, 2025 to November 5, 2025</strong></p>
        
        <div style="margin-top: 80px; display: flex; justify-content: space-between; align-items: bottom;">
          <div>
            <div style="border-bottom: 1px solid #94a3b8; width: 220px; font-style: italic; font-size: 18px; padding-bottom: 5px;">Satheesha B. Nanjappa</div>
            <div style="font-size: 11px; margin-top: 5px; color: #64748b;">Senior VP & Head, Education, Training & Assessment, Infosys</div>
          </div>
          <div>
            <div style="font-family: monospace; padding: 10px; border: 1px solid #007cc3; font-size: 10px;">ID: INF-6.0-B2</div>
          </div>
        </div>
      `;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${cert.name} - Gayatri Chebolu</title>
          <style>
            @media print {
              body, html {
                background: #fff;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                box-sizing: border-box;
              }
              .cert-container {
                box-shadow: none !important;
                border-width: 15px !important;
              }
            }
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              background-color: #0f172a;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
              box-sizing: border-box;
            }
            .cert-container {
              width: 840px;
              height: 595px;
              padding: 40px;
              box-sizing: border-box;
              background: white;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
              border-radius: 4px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;
              ${specificStyles}
            }
            .control-btn {
              margin-bottom: 20px;
              background-color: #3b82f6;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 14px;
              font-weight: bold;
              cursor: pointer;
              transition: background 0.2s;
            }
            .control-btn:hover {
              background-color: #2563eb;
            }
          </style>
        </head>
        <body>
          <button class="control-btn" onclick="window.print()">Print / Save PDF</button>
          <div class="cert-container">
            ${certLayoutHtml}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const renderCertificateFront = (cert: Certification) => {
    const certName = cert.name.toLowerCase();

    // 1. IIIT HYDERABAD (FMML)
    if (certName.includes("fmml") || certName.includes("hyderabad")) {
      return (
        <div className="w-full h-full p-3.5 bg-[#fbfbf9] border-[6px] border-double border-amber-900 text-stone-900 flex flex-col justify-between select-none relative overflow-hidden font-serif shadow-inner">
          {/* Inner thin border */}
          <div className="absolute inset-1 border border-amber-900/20 pointer-events-none" />
          
          <div className="flex justify-between items-start leading-none relative z-10">
            <div className="flex items-center gap-1 scale-90 origin-left">
              <div className="w-4 h-4 rounded-full bg-blue-900 flex items-center justify-center text-[5px] text-white font-sans font-black shrink-0">HUB</div>
              <span className="text-[5.5px] font-sans font-extrabold tracking-tight text-stone-700">HUB-DATA IIIT-H</span>
            </div>
            <div className="flex items-center gap-1 scale-90 origin-right">
              <span className="text-[5.5px] font-sans font-extrabold tracking-tight text-indigo-900">IIIT HYDERABAD</span>
              <div className="w-4 h-4 rounded-full bg-indigo-900 flex items-center justify-center text-[5px] text-white font-sans font-black shrink-0">IIITH</div>
            </div>
          </div>

          <div className="text-center relative z-10 -mt-1 px-1">
            <h5 className="font-serif text-[11px] font-black text-stone-900 tracking-wide uppercase leading-none mb-1">
              Certificate of Proficiency
            </h5>
            <p className="text-[6px] italic text-stone-500 font-serif leading-none mb-0.5">Certified that</p>
            <p className="text-[12px] font-sans font-extrabold tracking-normal text-amber-950 uppercase leading-none my-0.5">
              CHEBOLU GAYATRI
            </p>
            <p className="text-[5.5px] leading-relaxed text-stone-700 font-serif max-w-[210px] mx-auto mt-0.5">
              from KIET for Women has successfully completed <strong className="text-stone-905 font-sans text-[5.8px]">Foundations of Modern Machine Learning</strong> online program conducted from 19 Aug 2023 to 11 May 2024, securing <strong className="text-emerald-700 font-sans text-[5.8px] font-black px-0.5 bg-emerald-50 rounded">Grade A</strong>.
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-amber-900/15 pt-0.5 text-stone-800 font-sans scale-[0.88] origin-bottom">
            <div className="text-left leading-none">
              <span className="font-mono text-[4.5px] block font-black text-stone-400">QR VERIFIED</span>
              <span className="font-serif italic text-[7.5px] font-black block text-stone-900 mt-1">C K Raju</span>
              <span className="text-[4px] text-stone-500 block leading-tight">Head (Programs), iHub-Data</span>
            </div>
            <div className="w-5.5 h-5.5 border border-stone-200 p-0.5 bg-white flex flex-col justify-center items-center scale-90">
              <div className="w-full h-full bg-stone-950" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 70% 30%, 70% 70%, 100% 70%, 100% 100%, 0 100%, 0 70%, 30% 70%, 30% 30%, 0 30%)' }} />
            </div>
            <div className="text-right leading-none">
              <span className="font-mono text-[4.5px] block font-black text-stone-400">GRADE A</span>
              <span className="font-serif italic text-[7.5px] font-black block text-stone-900 mt-1">Monalisa P</span>
              <span className="text-[4px] text-stone-500 block leading-tight">Course Instructor</span>
            </div>
          </div>
        </div>
      );
    }

    // 2. MICROSOFT TECHSAKSHAM
    if (certName.includes("techsaksham") || certName.includes("practical implementations")) {
      return (
        <div className="w-full h-full p-3 bg-white text-slate-800 flex flex-col justify-between border-[5px] border-indigo-900 select-none relative overflow-hidden font-sans shadow-lg">
          {/* Top logos bar */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-1 leading-none scale-90 origin-top">
            <div className="flex items-center gap-1">
              <div className="grid grid-cols-2 gap-[1px] w-3 h-3 shrink-0">
                <div className="bg-[#f25022] w-1.5 h-1.5" /><div className="bg-[#7fba00] w-1.5 h-1.5" />
                <div className="bg-[#00a4ef] w-1.5 h-1.5" /><div className="bg-[#ffb900] w-1.5 h-1.5" />
              </div>
              <span className="text-[6.5px] font-black text-slate-500 font-sans tracking-tight">Microsoft</span>
            </div>
            <div className="text-[5.5px] font-black uppercase text-amber-600 tracking-tighter">AICTE Approved</div>
            <span className="text-[6.5px] font-black text-indigo-900 font-sans tracking-wide">edunet</span>
            <span className="text-[6.5px] font-black text-sky-600 font-mono tracking-tighter">SAP</span>
          </div>

          {/* TechSaksham branding */}
          <div className="text-center my-0.5 px-1 relative">
            <h5 className="text-[11.5px] font-extrabold text-[#006097] tracking-wider uppercase leading-none">
              Certificate of Achievement
            </h5>
            <div className="text-[5.5px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">TechSaksham Program Initiative</div>
            
            <p className="text-[6px] italic text-slate-400 mt-1 leading-none">presented to</p>
            <h4 className="text-[13px] font-black text-slate-900 tracking-wide uppercase leading-none my-0.5 border-b border-indigo-50 max-w-[130px] mx-auto pb-0.5">
              GAYATRI CHEBOLU
            </h4>
            <p className="text-[5.8px] leading-snug text-slate-600 font-medium px-2 max-w-[220px] mx-auto">
              for completing the certification course in <strong className="text-[#006097] font-semibold text-[6px]">Applied Artificial Intelligence: Practical Implementations</strong> under Microsoft &amp; SAP Joint CSR (2024-25).
            </p>
          </div>

          {/* Bottom signatures bar */}
          <div className="flex justify-between items-end border-t border-slate-100 pt-0.5 scale-[0.88] origin-bottom tracking-tight leading-none px-1">
            <div className="text-left leading-none">
              <span className="font-serif italic text-[7.5px] font-black block text-slate-900">Nagesh Singh</span>
              <span className="text-[4px] text-slate-500 block leading-none">Chairman, Edunet</span>
            </div>
            <div className="text-center leading-none">
              <span className="font-mono text-[5px] block font-black text-slate-400">TSPIN25_590292</span>
            </div>
            <div className="text-right leading-none">
              <span className="font-serif italic text-[7.5px] font-black block text-slate-900">Dr. Sunil Luthra</span>
              <span className="text-[4px] text-slate-500 block leading-none">Director, AICTE Bureau</span>
            </div>
          </div>
        </div>
      );
    }

    // 3. IBM SKILLSBUILD (EDUNET-AI)
    if (certName.includes("edunet") || certName.includes("artificial intelligence")) {
      return (
        <div className="w-full h-full bg-white text-slate-800 flex flex-col justify-between border border-slate-250 select-none relative overflow-hidden font-sans shadow-lg">
          {/* Top grey header */}
          <div className="bg-[#4a4a4a] text-white py-1.5 px-3 flex justify-between items-center leading-none">
            <span className="text-[9px] font-bold tracking-tight">IBM <strong className="text-amber-400 font-extrabold">SkillsBuild</strong></span>
            <span className="text-[7px] text-slate-200 uppercase font-bold tracking-wider">Completion certificate</span>
          </div>

          <div className="flex-1 flex p-2 items-center gap-3">
            {/* Yellow Ribbon Badge */}
            <div className="w-14 shrink-0 flex flex-col items-center justify-center scale-95">
              <div className="relative">
                <div className="w-9 h-9 rounded-full border-4 border-amber-400 bg-amber-50 flex items-center justify-center text-amber-500 text-lg font-black shadow-inner">
                  🏆
                </div>
                <div className="absolute -bottom-2.5 left-2 w-2 h-4 bg-amber-400 rotate-[15deg] origin-top border-b border-r border-amber-500" />
                <div className="absolute -bottom-2.5 right-2 w-2 h-4 bg-amber-400 -rotate-[15deg] origin-top border-b border-l border-amber-500" />
              </div>
            </div>

            {/* Main content right side */}
            <div className="flex-1 text-left space-y-0.5 leading-none">
              <p className="text-[6.5px] text-slate-400 font-medium">This certificate is presented to</p>
              <h4 className="text-[14px] font-black text-slate-900 tracking-wide uppercase leading-none py-0.5 border-b border-slate-100">
                CHEBOLU GAYATRI
              </h4>
              <p className="text-[6px] text-slate-400 font-medium mt-0.5">for the completion of</p>
              <h5 className="text-[10.5px] font-black text-indigo-950 tracking-tight leading-snug">
                Edunet-Artificial Intelligence
              </h5>
              <p className="text-[5.5px] font-mono text-slate-500 font-semibold leading-none">(PLAN-8A48645196FA)</p>
              <p className="text-[4.5px] font-serif text-slate-450 italic mt-1 leading-none">According to Your Learning Builder - Plans system of record</p>
            </div>
          </div>

          {/* Bottom completion date bar */}
          <div className="bg-[#cdcdcd]/45 border-t border-slate-300 py-1 px-3 flex justify-between items-center text-[5.5px] font-mono text-slate-600 font-bold">
            <span>Completion date: 17 Dec 2025 (GMT)</span>
            <span className="scale-75 text-[6px] tracking-widest text-[#2f3e46] uppercase font-black">IBM OFFICIAL</span>
          </div>
        </div>
      );
    }

    // 4. IBM SKILLSBUILD (CAREER MANAGEMENT ESSENTIALS)
    if (certName.includes("career")) {
      return (
        <div className="w-full h-full bg-[#1ccacd]/20 text-indigo-950 flex flex-col justify-between border border-[#1ccacd]/40 select-none relative overflow-hidden font-sans shadow-lg" style={{ background: 'linear-gradient(135deg, #eefbfc 0%, #abe9eb 100%)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ccacd]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="p-3.5 text-left flex-1 flex flex-col justify-between">
            <div className="space-y-0.5">
              <span className="text-[8px] font-black tracking-tight font-sans text-[#154a4c] uppercase block">IBM SkillsBuild</span>
              <h3 className="text-[16px] font-black text-[#15464c] tracking-tighter leading-tight uppercase font-sans border-b border-[#1ccacd]/30 pb-0.5">
                Career Management Essentials
              </h3>
            </div>

            <div className="my-1 text-left">
              <p className="text-[5.5px] text-[#15464c]/60 font-semibold uppercase leading-none block mb-0.5">Recipient of Credential</p>
              <h4 className="text-[13px] font-black text-indigo-950 uppercase tracking-tight leading-none">
                GAYATRI CHEBOLU
              </h4>
              <p className="text-[5px] text-teal-800 font-mono mt-1 leading-none font-bold">Verifiable Completion: IBM-CME-2025</p>
            </div>
          </div>

          <div className="bg-[#15464c] py-2 px-3.5 flex justify-between items-center leading-none text-white">
            <div className="flex items-center gap-1 opacity-80 scale-90 origin-left">
              <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center text-[6px]">💼</div>
              <span className="text-[5.5px] font-mono tracking-widest font-black uppercase">Professional Track</span>
            </div>
            <div className="flex flex-col gap-[1.5px] w-8 shrink-0 select-none opacity-90">
              <div className="h-[1.5px] bg-white w-full" />
              <div className="h-[1.5px] bg-white w-full" />
              <div className="h-[1.5px] bg-white w-full" />
            </div>
          </div>
        </div>
      );
    }

    // 5. BCG X / FORAGE
    if (certName.includes("forage") || certName.includes("bcg")) {
      return (
        <div className="w-full h-full bg-white text-slate-800 flex select-none relative overflow-hidden font-sans border-l-[12px] border-[#0f766e] shadow-md border border-slate-200">
          <div className="flex-1 p-3.5 flex flex-col justify-between text-left">
            <div>
              <div className="flex justify-between items-center border-b border-teal-100 pb-1 leading-none">
                <span className="text-[9.5px] font-black tracking-tight text-emerald-950 uppercase">BCG X</span>
                <span className="text-[8px] font-extrabold text-white bg-[#0f766e] px-1.5 py-0.5 rounded font-sans scale-90">Forage</span>
              </div>

              <div className="space-y-0.5 mt-1 px-0.5">
                <h5 className="text-[13px] font-black text-slate-900 tracking-tight uppercase leading-none">GAYATRI CHEBOLU</h5>
                <p className="text-[10px] font-black text-[#0f766e] leading-none mt-0.5">GenAI Job Simulation</p>
                <p className="text-[6.5px] text-slate-400 leading-none mt-0.5 italic">Certificate of Completion - August 13, 2025</p>
                
                <p className="text-[5.5px] leading-normal text-slate-600 border-t border-slate-50 mt-1 pt-1 font-medium">
                  • Practical Tasks: Data extraction and initial analysis <br/>
                  • Chatbots: Developing an AI-powered financial chatbot
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end pt-1 border-t border-slate-100 leading-none scale-95 origin-bottom">
              <div>
                <span className="text-[7px] italic font-serif text-slate-800 block font-bold leading-none">Tom Brunskill</span>
                <span className="text-[4px] text-slate-400 block mt-0.5">CEO, Co-Founder of Forage</span>
              </div>
              <span className="text-[5.5px] text-slate-400 font-mono tracking-tight font-medium">oi7JDahHtGKnPhe3</span>
            </div>
          </div>
        </div>
      );
    }

    // 6. WADHWANI FOUNDATION
    if (certName.includes("wadhwani") || certName.includes("jobready")) {
      return (
        <div className="w-full h-full p-2.5 bg-[#fefcf8] border-[10px] border-[#f97316] text-stone-900 flex select-none relative overflow-hidden font-sans shadow-lg">
          {/* Left panel for branding */}
          <div className="w-14 bg-gradient-to-b from-[#f97316]/5 to-[#f97316]/10 border-r border-[#f97316]/15 pr-2.5 flex flex-col justify-between items-center py-1">
            <div className="text-center leading-none">
              <span className="text-[6.5px] font-black text-[#f97316] tracking-tighter uppercase block leading-none">WADHWANI</span>
              <span className="text-[4px] tracking-widest text-[#7c2d12] font-mono font-bold leading-none block">FOUNDATION</span>
            </div>
            <div className="w-8 h-8 relative my-auto">
              <div className="absolute inset-0 bg-slate-300 rounded-full border border-slate-400 flex items-center justify-center font-black text-white text-[18px] shadow-sm">
                ★
              </div>
            </div>
            <span className="text-[5px] font-mono font-black text-slate-400 select-none uppercase tracking-wide">BASIC</span>
          </div>

          {/* Right main panel */}
          <div className="flex-1 pl-3.5 flex flex-col justify-between text-left relative">
            <div>
              <h4 className="text-[10px] font-black text-[#c2410c] tracking-tight uppercase leading-none border-b border-orange-100 pb-0.5">
                Certificate of Completion - Basic
              </h4>
              <p className="text-[5.5px] italic text-[#666] leading-none mt-1">This is to certify that</p>
              <h3 className="text-[13.5px] font-black text-slate-900 uppercase my-0.5 leading-none">
                GAYATRI CHEBOLU
              </h3>
              <p className="text-[5.8px] leading-relaxed text-stone-700 font-medium">
                from <strong className="text-orange-950 font-bold">Eduskills Foundation</strong> completed <strong className="text-[#c2410c] font-bold">JobReady: Employability Skills</strong> Basic Level (79 Hours) on September 09, 2025.
              </p>
            </div>

            <div className="flex justify-between items-end border-t border-orange-50 pb-0.5 leading-none scale-95 origin-bottom">
              <div>
                <span className="text-[7.5px] italic font-serif block text-stone-800 font-bold">Ajay Kela</span>
                <span className="text-[4px] font-mono text-[#777] block">CEO, Wadhwani Foundation</span>
              </div>
              <div className="text-right leading-none">
                <span className="font-mono text-[4.5px] block font-black text-stone-400">VERIFIED CODE</span>
                <span className="font-mono text-[5px] text-[#f97316] font-bold">WF-BASIC-2025</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 7. APEXPLANET WEB INTERNSHIP
    if (certName.includes("apexplanet") || certName.includes("web development")) {
      return (
        <div className="w-full h-full p-3 bg-white text-slate-800 flex flex-col justify-between border-[8px] border-[#024959] select-none relative overflow-hidden font-sans shadow-lg">
          {/* Corner triangle styles */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-[#024959] rotate-45 -translate-y-5 -translate-x-5 pointer-events-none opacity-90" />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#024959] rotate-45 translate-y-5 translate-x-5 pointer-events-none opacity-90" />
          
          <div className="text-center relative z-10 leading-none">
            <span className="text-[12px] font-black uppercase tracking-tight text-[#024959]">Certificate of Completion</span>
            <div className="text-[5.5px] font-mono tracking-wider text-slate-400 font-extrabold uppercase mt-0.5">WEB DEVELOPMENT VIRTUAL INTERNSHIP</div>
          </div>

          <div className="text-center my-1 px-1 relative z-10">
            <p className="text-[6px] italic text-slate-400 leading-none">presented to</p>
            <h4 className="text-[13px] font-black text-slate-900 uppercase my-0.5 leading-none tracking-wide">
              GAYATRI CHEBOLU
            </h4>
            <p className="text-[5.8px] leading-snug text-slate-600 font-semibold max-w-[210px] mx-auto">
              for completing the virtual internship in <strong className="text-[#024959]">Web Development (HTML, CSS, JavaScript)</strong> at ApexPlanet Software Pvt. Ltd. (Aug 1 - Sep 15, 2025).
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-slate-100 pt-1 scale-90 origin-bottom leading-none relative z-10">
            <div className="text-left">
              <span className="font-serif italic text-[7px] font-black block text-slate-900 leading-none">Kundan Kumar</span>
              <span className="text-[4px] text-slate-400 block mt-0.5 leading-none">Founder &amp; CEO, ApexPlanet</span>
            </div>
            <div className="text-center leading-none">
              <span className="font-mono text-[4.5px] block font-black text-stone-300">ID: APSPL2513808</span>
            </div>
            <div className="flex items-center gap-0.5 opacity-80 scale-85 text-[5px] font-mono font-black text-[#024959]">
              <span className="bg-teal-50 px-1 py-0.5 rounded border border-teal-200">MSME</span>
              <span className="bg-teal-50 px-1 py-0.5 rounded border border-teal-200">AICTE</span>
            </div>
          </div>
        </div>
      );
    }

    // 8. 3SKILL INDIA (AIMI)
    if (certName.includes("3skill") || certName.includes("aimi")) {
      return (
        <div className="w-full h-full p-3.5 bg-white text-slate-800 flex flex-col justify-between border border-blue-900/15 relative overflow-hidden font-sans select-none shadow-lg">
          <div className="absolute inset-1 border-[3px] border-double border-indigo-950 pointer-events-none" />

          <div className="flex justify-between items-start leading-none relative z-10 scale-[0.9] origin-top">
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 bg-indigo-600 flex items-center justify-center text-white text-[7px] rounded-sm font-black tracking-tight shadow">M</div>
              <span className="text-[6.5px] font-black tracking-tighter text-indigo-950 uppercase">3Skill India</span>
            </div>
            <div className="text-right leading-none">
              <span className="text-[5.5px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-100 rounded px-1">INTERN260042</span>
            </div>
          </div>

          <div className="text-center relative z-10 -mt-1.5 px-1 font-serif">
            <h5 className="font-sans text-[11px] font-extrabold text-blue-950 tracking-widest uppercase leading-none mb-0.5">
              Certificate Of Internship
            </h5>
            <p className="text-[5.5px] italic text-[#666] leading-none mb-0.5">proudly presented to</p>
            <h4 className="text-[13px] font-sans font-extrabold text-slate-900 uppercase my-0.5 leading-none">
              GAYATRI CHEBOLU
            </h4>
            <p className="text-[5.8px] leading-relaxed text-slate-600 font-sans font-medium max-w-[215px] mx-auto">
              for successfully completing secondary virtual internship in the <strong className="text-indigo-900 font-bold">AIMI</strong> (AI &amp; Machine Learning) Specialization Program.
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-slate-100 pt-0.5 relative leading-none scale-[0.88] origin-bottom px-0.5">
            <div className="text-left leading-none">
              <span className="font-serif italic text-[7.5px] font-black block text-slate-900">S. Levin</span>
              <span className="text-[4px] font-mono text-slate-500 block leading-none">CEO, 3Skill India</span>
            </div>
            <div className="w-6.5 h-6.5 rounded-full bg-red-650 border border-red-700 flex flex-col justify-center items-center text-center text-white font-extrabold text-[3.5px] leading-none select-none shadow uppercase -mt-1 rotate-[4deg]">
              <span>3SKILL</span>
              <span className="text-[2.2px] scale-90">SEAL</span>
            </div>
            <div className="text-right leading-none">
              <span className="font-mono text-[5px] block font-black text-indigo-500 opacity-80 font-sans">STILL ACTIVE</span>
            </div>
          </div>
        </div>
      );
    }

    // 9. INFOSYS SPRINGBOARD
    if (certName.includes("infosys") || certName.includes("springboard") || certName.includes("codegenie")) {
      return (
        <div className="w-full h-full p-3.5 bg-white text-slate-800 flex flex-col justify-between relative overflow-hidden font-sans border-x-[12px] border-sky-450 select-none shadow-lg">
          <div className="absolute inset-0 border-y border-sky-100 pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-sky-50 pb-1 leading-none scale-90 origin-top">
            <span className="text-[12px] font-bold text-[#007cc3] tracking-tighter">Infosys <strong className="text-slate-400 font-sans font-light">Springboard</strong></span>
            <span className="text-[6.5px] font-mono text-[#007cc3]/70 uppercase font-black tracking-widest">Internship</span>
          </div>

          <div className="text-center relative z-10 px-1 -mt-1">
            <h5 className="font-sans text-[11px] font-bold text-[#007cc3] uppercase tracking-wide leading-none mb-1">
              Certificate of Completion
            </h5>
            <p className="text-[5.5px] italic text-[#666] leading-none mb-0.5">presented to</p>
            <h4 className="text-[12.5px] font-black text-indigo-950 uppercase my-0.5 leading-none">
              GAYATRI CHEBOLU
            </h4>
            <p className="text-[5.8px] leading-snug text-slate-700 font-medium px-2 max-w-[210px] mx-auto">
              for completing the mandatory assignments under Internship 6.0 in <strong className="text-[#007cc3] font-bold">CodeGenie: AI Explainer and Code Generator</strong> (Sep 1 - Nov 5, 2025).
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-sky-50 pt-0.5 scale-[0.88] origin-bottom tracking-tight leading-none px-0.5">
            <div className="text-left leading-none">
              <span className="font-serif italic text-[7px] font-black block text-slate-900 leading-none">Satheesha B. Nanjappa</span>
              <span className="text-[3.5px] text-slate-500 block leading-tight">Senior VP, ETA, Infosys Ltd.</span>
            </div>
            <div className="w-5 h-5 flex flex-col justify-center items-center opacity-80 shrink-0 scale-90 bg-white shadow-inner p-0.5 rounded border border-slate-100">
              <div className="grid grid-cols-3 gap-[1px] w-full h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-full h-full ${i % 2 === 0 ? "bg-[#007cc3]" : "bg-transparent"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full p-4 bg-gradient-to-br from-indigo-950 to-slate-900 border border-slate-700 flex flex-col justify-between text-white font-sans text-left">
        <div>
          <span className="text-[7.5px] font-mono text-blue-400 uppercase tracking-wider">{cert.issuer}</span>
          <h4 className="text-[11px] font-black tracking-tight leading-tight uppercase">{cert.name}</h4>
        </div>
        <div className="text-[7px] font-mono text-slate-400">GRADE: {cert.grade || 'Verified'}</div>
      </div>
    );
  };

  const renderCertificateBack = (cert: Certification) => {
    return (
      <div className="w-full h-full p-4 bg-slate-900 border border-blue-500/20 text-white flex flex-col justify-between text-left font-sans select-none relative rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

        <div className="space-y-2 z-10 leading-none">
          <div className="flex justify-between items-center pb-1 border-b border-white/5 leading-none">
            <span className="text-[7px] font-mono tracking-widest text-blue-400 uppercase font-bold block leading-none">CREDENTIAL DETAILS</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>

          <div className="space-y-0.5">
            <h4 className="text-[10px] font-bold leading-tight text-white line-clamp-2 uppercase tracking-tight">{cert.name}</h4>
            <div className="text-[8px] text-slate-400 font-medium leading-none">{cert.issuer}</div>
          </div>

          {cert.skills && (
            <div className="space-y-1">
              <span className="text-[6.5px] font-mono text-slate-500 block uppercase font-black leading-none">Validated Skills</span>
              <div className="flex flex-wrap gap-1">
                {cert.skills.slice(0, 3).map((skill, si) => (
                  <span key={si} className="text-[6.5px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold px-1.5 py-0.2 rounded-sm uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="text-[6.5px] font-mono text-slate-500 font-black whitespace-nowrap">+{cert.skills.length - 3}</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-0.5">
            <span className="text-[6.5px] font-mono text-slate-500 block uppercase font-black leading-none">VERIFIABLE PLAN ID</span>
            <span className="text-[7px] font-mono text-blue-400 block break-all font-bold tracking-wider uppercase opacity-90 leading-none">{cert.verificationId || "GAYATRI-CREDENTIAL"}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrintCertificate(cert);
            }}
            className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-98 transition text-[8.5px] font-bold text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider font-sans border border-blue-500/30"
          >
            <Download className="w-3 h-3 text-white" />
            <span>Download Scan</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="certifications" className="relative py-28 bg-[#030712] border-t border-white/5 overflow-hidden">
      {/* Dynamic Style Tags to handle glitch-free paused animations smoothly on-hover */}
      <style>{`
        @keyframes scrollLeftHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRightHorizontal {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-horizontal-left {
          animation: scrollLeftHorizontal 35s linear infinite;
          will-change: transform;
        }
        .scroll-horizontal-right {
          animation: scrollRightHorizontal 35s linear infinite;
          will-change: transform;
        }
        .scroll-horizontal-container:hover .scroll-horizontal-left,
        .scroll-horizontal-container:hover .scroll-horizontal-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Blur Backdrops */}
      <div className="absolute top-[20%] right-[5%] w-[35rem] h-[35rem] rounded-full bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-indigo-650/4 blur-[130px] -z-10 pointer-events-none" />

      {/* UNIFIED SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>05 // VERIFIED CREDENTIALS & SPECIALIZATIONS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200">
            Professional <span className="text-blue-500">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4" />
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-5 leading-relaxed font-sans">
            Continuous, dual-direction autoscrolling tracks of verified honors and industry-completed simulation experiences. Hover to freeze, click card to flip, or download certified scans.
          </p>
        </div>
      </div>

      {/* DUAL-TRACK DYNAMIC CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10 select-none w-full overflow-hidden">
        
        {/* UPPER TRACK: COURSE CERTIFICATES (AUTOSCROLL LEFTWARD) */}
        <div className="scroll-horizontal-container flex flex-col w-full relative">
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#94a3b8] font-bold">
                Verified Course Certifications →
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">({courseCerts.length} items)</span>
          </div>

          <div className="w-full overflow-hidden relative rounded-2xl border border-white/5 bg-slate-950/20 py-5 backdrop-blur-sm shadow-2xl">
            {/* Horizontal Continuous Row */}
            <div className="flex scroll-horizontal-left w-max gap-6 px-4">
              {[...courseCerts, ...courseCerts, ...courseCerts].map((cert, index) => {
                const uniqueId = `course-${index}`;
                const isFlipped = activeFlippedIndex === uniqueId;

                return (
                  <div key={index} className="w-[330px] sm:w-[460px] h-[210px] shrink-0">
                    <TiltWrapper
                      onClick={() => setActiveFlippedIndex(isFlipped ? null : uniqueId)}
                      className="group"
                    >
                      <div
                        className="w-full h-full relative"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                      >
                        {/* Front: Premium Glassmorphic card */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/40 bg-[#070b14]/95 backdrop-blur-md group-hover:scale-[1.01] duration-300 shadow-xl flex p-5 gap-3 justify-between items-stretch"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex flex-col justify-between flex-1 text-left min-w-0">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider uppercase truncate block">{cert.issuer}</span>
                              <h4 className="text-xs sm:text-sm font-black text-white tracking-tight font-display line-clamp-2 mt-1 leading-snug">
                                {cert.name}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono mt-1 font-semibold">
                                <Calendar className="w-3 h-3 text-blue-400/80" />
                                <span>{cert.date}</span>
                              </div>
                            </div>

                            <div className="mt-1 text-left">
                              <span className="text-[8px] font-mono text-slate-550 uppercase tracking-widest font-extrabold leading-none block mb-1">// SKILLS GAINED</span>
                              <div className="flex flex-wrap gap-1">
                                {cert.skills?.slice(0, 2).map((skill, si) => (
                                  <span key={si} className="text-[8px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold px-1.5 py-0.5 rounded uppercase font-semibold">
                                    {skill}
                                  </span>
                                ))}
                                {cert.skills && cert.skills.length > 2 && (
                                  <span className="text-[8px] font-mono text-slate-500 font-bold">+{cert.skills.length - 2}</span>
                                )}
                              </div>
                            </div>

                            {/* Actions block */}
                            <div className="flex items-center gap-1.5 mt-auto shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveFlippedIndex(isFlipped ? null : uniqueId);
                                }}
                                className="px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 active:scale-95 transition text-[8px] font-mono font-black text-blue-400 flex items-center gap-0.5 tracking-wider uppercase"
                              >
                                <RotateCw className="w-2.5 h-2.5 text-blue-450" />
                                <span>Details</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePrintCertificate(cert);
                                }}
                                className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[8px] font-black uppercase tracking-wider shadow-md hover:shadow-blue-500/20 flex items-center gap-0.5 border border-blue-500/30 active:scale-95 transition"
                              >
                                <Download className="w-2.5 h-2.5" />
                                <span>Print</span>
                              </button>
                            </div>
                          </div>

                          {/* Scaled certificate replica on front */}
                          <div className="w-[95px] sm:w-[125px] h-full rounded-xl border border-white/5 bg-slate-950/80 shadow-2xl relative overflow-hidden flex items-center justify-center p-1 group-hover:border-blue-500/20 duration-300 shrink-0 scale-95 origin-right">
                            <style>{`
                              .mini-scale-preview-course-${index} {
                                transform: scale(0.28);
                                transform-origin: center;
                                width: 320px;
                                height: 220px;
                                pointer-events: none;
                                user-select: none;
                              }
                            `}</style>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none z-10" />
                            <div className={`mini-scale-preview-course-${index}`}>
                              {renderCertificateFront(cert)}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/70 transition-opacity duration-300 z-20">
                              <span className="text-[8px] font-mono text-blue-450 font-black tracking-widest uppercase">ENLARGE</span>
                            </div>
                          </div>
                        </div>

                        {/* Back: Interactive panel */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                          }}
                        >
                          {renderCertificateBack(cert)}
                        </div>
                      </div>
                    </TiltWrapper>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LOWER TRACK: INTERNSHIP COMPLETION CERTIFICATES (AUTOSCROLL RIGHTWARD) */}
        <div className="scroll-horizontal-container flex flex-col w-full relative">
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.5)] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#94a3b8] font-bold">
                Internship &amp; Industrial Simulation Certificates ←
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">({internshipCerts.length} items)</span>
          </div>

          <div className="w-full overflow-hidden relative rounded-2xl border border-white/5 bg-slate-950/20 py-5 backdrop-blur-sm shadow-2xl">
            {/* Horizontal Continuous Row */}
            <div className="flex scroll-horizontal-right w-max gap-6 px-4">
              {[...internshipCerts, ...internshipCerts, ...internshipCerts].map((cert, index) => {
                const uniqueId = `internship-${index}`;
                const isFlipped = activeFlippedIndex === uniqueId;

                return (
                  <div key={index} className="w-[330px] sm:w-[460px] h-[210px] shrink-0">
                    <TiltWrapper
                      onClick={() => setActiveFlippedIndex(isFlipped ? null : uniqueId)}
                      className="group"
                    >
                      <div
                        className="w-full h-full relative"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                      >
                        {/* Front: Premium Glassmorphic card */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/40 bg-[#070b14]/95 backdrop-blur-md group-hover:scale-[1.01] duration-300 shadow-xl flex p-5 gap-3 justify-between items-stretch"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex flex-col justify-between flex-1 text-left min-w-0">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase truncate block">{cert.issuer}</span>
                              <h4 className="text-xs sm:text-sm font-black text-white tracking-tight font-display line-clamp-2 mt-1 leading-snug">
                                {cert.name}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono mt-1 font-semibold">
                                <Calendar className="w-3 h-3 text-cyan-400/80" />
                                <span>{cert.date}</span>
                              </div>
                            </div>

                            <div className="mt-1 text-left">
                              <span className="text-[8px] font-mono text-slate-550 uppercase tracking-widest font-extrabold leading-none block mb-1">// TECH INVOLVED</span>
                              <div className="flex flex-wrap gap-1">
                                {cert.skills?.slice(0, 2).map((skill, si) => (
                                  <span key={si} className="text-[8px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded uppercase font-semibold">
                                    {skill}
                                  </span>
                                ))}
                                {cert.skills && cert.skills.length > 2 && (
                                  <span className="text-[8px] font-mono text-slate-500 font-bold">+{cert.skills.length - 2}</span>
                                )}
                              </div>
                            </div>

                            {/* Actions block */}
                            <div className="flex items-center gap-1.5 mt-auto shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveFlippedIndex(isFlipped ? null : uniqueId);
                                }}
                                className="px-2 py-1 rounded bg-[#0a2035]/60 hover:bg-[#0c2742] border border-cyan-500/25 active:scale-95 transition text-[8px] font-mono font-black text-cyan-400 flex items-center gap-0.5 tracking-wider uppercase"
                              >
                                <RotateCw className="w-2.5 h-2.5 text-cyan-450" />
                                <span>Details</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePrintCertificate(cert);
                                }}
                                className="px-2 py-1 rounded bg-[#0284c7] hover:bg-[#0369a1] text-white font-mono text-[8px] font-black uppercase tracking-wider shadow-md hover:shadow-cyan-500/20 flex items-center gap-0.5 border border-cyan-500/30 active:scale-95 transition"
                              >
                                <Download className="w-2.5 h-2.5" />
                                <span>Print</span>
                              </button>
                            </div>
                          </div>

                          {/* Scaled certificate replica on front */}
                          <div className="w-[95px] sm:w-[125px] h-full rounded-xl border border-white/5 bg-slate-950/80 shadow-2xl relative overflow-hidden flex items-center justify-center p-1 group-hover:border-blue-500/20 duration-300 shrink-0 scale-95 origin-right">
                            <style>{`
                              .mini-scale-preview-internship-${index} {
                                transform: scale(0.28);
                                transform-origin: center;
                                width: 320px;
                                height: 220px;
                                pointer-events: none;
                                user-select: none;
                              }
                            `}</style>
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none z-10" />
                            <div className={`mini-scale-preview-internship-${index}`}>
                              {renderCertificateFront(cert)}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/70 transition-opacity duration-300 z-20">
                              <span className="text-[8px] font-mono text-cyan-450 font-black tracking-widest uppercase">ENLARGE</span>
                            </div>
                          </div>
                        </div>

                        {/* Back: Interactive panel */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                          }}
                        >
                          {renderCertificateBack(cert)}
                        </div>
                      </div>
                    </TiltWrapper>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
