export interface Publication {
  id: number;
  year: number;
  title: string;
  authors: string[];
  venue: string;
  type:
    | "Journal Article"
    | "Conference Paper"
    | "Book Chapter"
    | "Preprint"
    | "Other";
  abstract: string;
  researchAreas: string[];
  pdfUrl?: string;
  doi?: string;
}

export const publications: Publication[] = [
  {
    id: 1,
    year: 2026,
    title: "Uncertainty-Calibrated Vision Transformers for Clinical Image Triage",
    authors: ["Dr. Elena Whitfield", "A. Kumar", "R. Chen"],
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    type: "Journal Article",
    abstract:
      "We introduce a lightweight calibration layer for vision transformers that improves confidence estimates on out-of-distribution clinical imagery without sacrificing predictive accuracy. Evaluated across three hospital imaging datasets, the method reduces expected calibration error by over 30% while preserving triage latency requirements for real-time deployment.",
    researchAreas: ["Artificial Intelligence", "Computer Vision", "Healthcare AI"],
    pdfUrl: "https://drive.google.com/file/d/1a2B3c4D5e6F7g8H9i0JkLmNoPqRsTuV/view",
    doi: "https://doi.org/10.1109/TPAMI.2026.301145",
  },
  {
    id: 2,
    year: 2026,
    title: "Sparse Attention Mechanisms for Long-Horizon Time Series Forecasting",
    authors: ["Dr. Elena Whitfield", "M. Torres"],
    venue: "Journal of Machine Learning Research",
    type: "Journal Article",
    abstract:
      "This paper proposes a sparse attention architecture that reduces computational cost by roughly 40% while matching state-of-the-art accuracy on multivariate forecasting benchmarks. We analyze the trade-off between sparsity patterns and long-range dependency modeling across energy, retail, and climate datasets.",
    researchAreas: ["Machine Learning", "Data Science", "Time Series Analysis"],
    pdfUrl: "https://drive.google.com/file/d/1B4c5D6e7F8g9H0iJkLmNoPqRsTuVwXy/view",
    doi: "https://doi.org/10.5555/jmlr.2026.884201",
  },
  {
    id: 3,
    year: 2025,
    title: "Learning Robust Visual Representations from Limited Labeled Data",
    authors: ["Dr. Elena Whitfield", "S. Patel", "J. Okoye"],
    venue: "Conference on Computer Vision and Pattern Recognition (CVPR)",
    type: "Conference Paper",
    abstract:
      "We present a semi-supervised representation learning framework that closes roughly 80% of the gap to fully supervised baselines while using ten times fewer labels. The approach combines contrastive pretraining with a lightweight consistency regularizer suited to limited-annotation research settings.",
    researchAreas: ["Computer Vision", "Deep Learning", "Machine Learning"],
    pdfUrl: "https://drive.google.com/file/d/1C5d6E7f8G9h0IjKlMnOpQrStUvWxYz1/view",
    doi: "https://doi.org/10.1109/CVPR.2025.019273",
  },
  {
    id: 4,
    year: 2025,
    title: "Federated Fine-Tuning of Foundation Models Under Data Heterogeneity",
    authors: ["Dr. Elena Whitfield", "H. Nakamura"],
    venue: "Neural Information Processing Systems (NeurIPS)",
    type: "Conference Paper",
    abstract:
      "We study how client-level data heterogeneity affects federated fine-tuning of large foundation models and propose an adaptive aggregation scheme that stabilizes convergence. Experiments across text and vision benchmarks show consistent gains over standard federated averaging.",
    researchAreas: ["Machine Learning", "Artificial Intelligence"],
    pdfUrl: "https://drive.google.com/file/d/1D6e7F8g9H0iJkLmNoPqRsTuVwXyZ1a2/view",
    doi: "https://doi.org/10.5555/neurips.2025.573310",
  },
  {
    id: 5,
    year: 2025,
    title: "A Survey of Uncertainty Quantification Methods in Deep Learning",
    authors: ["Dr. Elena Whitfield", "A. Kumar"],
    venue: "ACM Computing Surveys",
    type: "Journal Article",
    abstract:
      "This survey organizes the growing body of work on uncertainty quantification in deep learning into a unified taxonomy spanning Bayesian, ensemble, and calibration-based approaches. We highlight open problems in scaling these methods to foundation-model-sized architectures.",
    researchAreas: ["Machine Learning", "Uncertainty Quantification"],
    doi: "https://doi.org/10.1145/3587921",
  },
  {
    id: 6,
    year: 2024,
    title: "Self-Supervised Pretraining for Low-Resource Medical Imaging",
    authors: ["Dr. Elena Whitfield", "R. Chen", "L. Fontaine"],
    venue: "Medical Image Analysis",
    type: "Journal Article",
    abstract:
      "We evaluate self-supervised pretraining strategies for medical imaging tasks where annotated data is scarce, introducing a domain-specific augmentation policy that improves downstream segmentation accuracy by up to 12% across three imaging modalities.",
    researchAreas: ["Computer Vision", "Healthcare AI", "Deep Learning"],
    pdfUrl: "https://drive.google.com/file/d/1E7f8G9h0IjKlMnOpQrStUvWxYz1a2B3/view",
    doi: "https://doi.org/10.1016/j.media.2024.103102",
  },
  {
    id: 7,
    year: 2024,
    title: "Efficient Neural Architecture Search for Edge Robotics",
    authors: ["Dr. Elena Whitfield", "T. Bergström"],
    venue: "International Conference on Robotics and Automation (ICRA)",
    type: "Conference Paper",
    abstract:
      "We propose a hardware-aware neural architecture search procedure tailored to embedded robotic platforms, reducing search cost by an order of magnitude while discovering models that meet strict latency and power budgets on real hardware.",
    researchAreas: ["Robotics", "Machine Learning"],
    pdfUrl: "https://drive.google.com/file/d/1F8g9H0iJkLmNoPqRsTuVwXyZ1a2B3c4/view",
    doi: "https://doi.org/10.1109/ICRA.2024.442018",
  },
  {
    id: 8,
    year: 2024,
    title: "Interpretable Attention Maps for Clinical Decision Support",
    authors: ["Dr. Elena Whitfield", "J. Okoye", "S. Patel"],
    venue: "Workshop on Trustworthy AI in Healthcare, NeurIPS",
    type: "Conference Paper",
    abstract:
      "We examine how attention-based explanations in clinical decision support systems align with expert clinician reasoning, finding that raw attention weights frequently overstate model confidence in edge cases and proposing a post-hoc correction procedure.",
    researchAreas: ["Artificial Intelligence", "Healthcare AI"],
    doi: "https://doi.org/10.5555/neuripsw.2024.118820",
  },
  {
    id: 9,
    year: 2023,
    title: "Benchmarking Vision-Language Models on Scientific Figure Understanding",
    authors: ["Dr. Elena Whitfield", "M. Torres", "H. Nakamura"],
    venue: "European Conference on Computer Vision (ECCV)",
    type: "Conference Paper",
    abstract:
      "We introduce a benchmark of 4,200 scientific figures paired with expert-written captions and questions, and evaluate leading vision-language models on their ability to reason about axes, trends, and statistical significance depicted in plots.",
    researchAreas: ["Computer Vision", "Artificial Intelligence", "Data Science"],
    pdfUrl: "https://drive.google.com/file/d/1G9h0IjKlMnOpQrStUvWxYz1a2B3c4D5/view",
    doi: "https://doi.org/10.1007/ECCV.2023.774102",
  },
  {
    id: 10,
    year: 2023,
    title: "Distributionally Robust Optimization for Clinical Risk Prediction",
    authors: ["Dr. Elena Whitfield", "L. Fontaine"],
    venue: "IEEE Journal of Biomedical and Health Informatics",
    type: "Journal Article",
    abstract:
      "This work applies distributionally robust optimization to clinical risk prediction models, improving worst-case subgroup performance without materially degrading average accuracy, and reports results across five multi-site hospital cohorts.",
    researchAreas: ["Healthcare AI", "Machine Learning"],
    doi: "https://doi.org/10.1109/JBHI.2023.298104",
  },
  {
    id: 11,
    year: 2023,
    title: "On the Limits of In-Context Learning for Tabular Data",
    authors: ["Dr. Elena Whitfield", "A. Kumar"],
    venue: "arXiv preprint",
    type: "Preprint",
    abstract:
      "We probe the in-context learning abilities of large language models on structured tabular prediction tasks, finding that performance degrades sharply as feature cardinality grows and proposing a lightweight serialization scheme that partially closes the gap.",
    researchAreas: ["Machine Learning", "Data Science"],
    pdfUrl: "https://drive.google.com/file/d/1H0iJkLmNoPqRsTuVwXyZ1a2B3c4D5e6/view",
  },
  {
    id: 12,
    year: 2022,
    title: "Adaptive Data Augmentation for Low-Data Regimes in Medical Imaging",
    authors: ["Dr. Elena Whitfield", "R. Chen"],
    venue: "International Conference on Medical Image Computing (MICCAI)",
    type: "Conference Paper",
    abstract:
      "We propose an augmentation policy that adapts its strength based on training set size, yielding consistent gains over fixed augmentation schedules across four medical imaging benchmarks with fewer than 500 labeled examples each.",
    researchAreas: ["Computer Vision", "Healthcare AI"],
    doi: "https://doi.org/10.1007/MICCAI.2022.612093",
  },
  {
    id: 13,
    year: 2022,
    title: "Trustworthy Machine Learning: Principles and Practice",
    authors: ["Dr. Elena Whitfield", "T. Bergström", "M. Torres"],
    venue: "Springer Handbook of Applied Machine Learning",
    type: "Book Chapter",
    abstract:
      "This chapter surveys principles of trustworthy machine learning, including robustness, fairness, and calibration, and translates them into a practical checklist for practitioners deploying models in regulated industries such as healthcare and finance.",
    researchAreas: ["Artificial Intelligence", "Machine Learning"],
    pdfUrl: "https://drive.google.com/file/d/1I1jKlMnOpQrStUvWxYz1a2B3c4D5e6F/view",
  },
  {
    id: 14,
    year: 2022,
    title: "Graph Neural Networks for Molecular Property Prediction",
    authors: ["Dr. Elena Whitfield", "S. Patel"],
    venue: "Journal of Chemical Information and Modeling",
    type: "Journal Article",
    abstract:
      "We benchmark several graph neural network variants on molecular property prediction tasks and introduce an edge-conditioned message passing scheme that improves accuracy on datasets with sparse chemical bond annotations.",
    researchAreas: ["Machine Learning", "Data Science"],
    doi: "https://doi.org/10.1021/acs.jcim.2022.00871",
  },
  {
    id: 15,
    year: 2021,
    title: "Speech-Driven Human-Robot Interaction in Unstructured Environments",
    authors: ["Dr. Elena Whitfield", "H. Nakamura", "J. Okoye"],
    venue: "IEEE/RSJ International Conference on Intelligent Robots (IROS)",
    type: "Conference Paper",
    abstract:
      "We present a speech-driven interaction pipeline for mobile robots operating in unstructured environments, combining lightweight intent recognition with reactive motion planning to handle ambiguous or interrupted verbal commands.",
    researchAreas: ["Robotics", "Human-Computer Interaction"],
    pdfUrl: "https://drive.google.com/file/d/1J2kLmNoPqRsTuVwXyZ1a2B3c4D5e6F7/view",
    doi: "https://doi.org/10.1109/IROS.2021.556301",
  },
  {
    id: 16,
    year: 2021,
    title: "Calibrated Confidence Estimation for Natural Language Inference",
    authors: ["Dr. Elena Whitfield", "M. Torres"],
    venue: "Association for Computational Linguistics (ACL)",
    type: "Conference Paper",
    abstract:
      "This paper studies confidence calibration in natural language inference models and shows that standard fine-tuning procedures systematically overestimate confidence on adversarially constructed examples, proposing a simple temperature-scaling remedy.",
    researchAreas: ["Natural Language Processing", "Machine Learning"],
    doi: "https://doi.org/10.18653/v1/2021.acl-long.402",
  },
  {
    id: 17,
    year: 2020,
    title: "A Dataset for Benchmarking Fairness in Clinical Risk Models",
    authors: ["Dr. Elena Whitfield", "L. Fontaine", "A. Kumar"],
    venue: "Technical Report, Meridian Institute of Technology",
    type: "Other",
    abstract:
      "We release a curated dataset and evaluation protocol for benchmarking subgroup fairness in clinical risk prediction models, accompanied by baseline results for five commonly used model families across demographic strata.",
    researchAreas: ["Healthcare AI", "Data Science"],
    pdfUrl: "https://drive.google.com/file/d/1K3lMnOpQrStUvWxYz1a2B3c4D5e6F7G/view",
  },
  {
    id: 18,
    year: 2020,
    title: "Contrastive Pretraining for Satellite Imagery Classification",
    authors: ["Dr. Elena Whitfield", "S. Patel"],
    venue: "IEEE Transactions on Geoscience and Remote Sensing",
    type: "Journal Article",
    abstract:
      "We adapt contrastive self-supervised pretraining to multi-spectral satellite imagery, demonstrating improved land-cover classification accuracy in regions with limited labeled training data across three continents.",
    researchAreas: ["Computer Vision", "Deep Learning"],
    doi: "https://doi.org/10.1109/TGRS.2020.298715",
  },
  {
    id: 19,
    year: 2019,
    title: "Bayesian Deep Learning for Streaming Sensor Data",
    authors: ["Dr. Elena Whitfield", "T. Bergström"],
    venue: "International Conference on Machine Learning (ICML)",
    type: "Conference Paper",
    abstract:
      "We propose an online Bayesian deep learning framework for streaming sensor data that maintains calibrated uncertainty estimates under distribution shift, validated on industrial monitoring and environmental sensing datasets.",
    researchAreas: ["Machine Learning", "Uncertainty Quantification"],
    pdfUrl: "https://drive.google.com/file/d/1L4mNoPqRsTuVwXyZ1a2B3c4D5e6F7G8/view",
    doi: "https://doi.org/10.5555/icml.2019.330019",
  },
  {
    id: 20,
    year: 2019,
    title: "Explainable AI in Radiology: A Clinician-Centered Evaluation",
    authors: ["Dr. Elena Whitfield", "R. Chen", "J. Okoye"],
    venue: "Radiology: Artificial Intelligence",
    type: "Journal Article",
    abstract:
      "Through structured interviews and blinded evaluations with practicing radiologists, we assess which explanation formats for AI-assisted diagnosis are actually trusted and useful in clinical workflow, challenging several common assumptions in the explainability literature.",
    researchAreas: ["Healthcare AI", "Artificial Intelligence"],
    doi: "https://doi.org/10.1148/ryai.2019190021",
  },
  {
    id: 21,
    year: 2018,
    title: "Scalable Gaussian Processes for Spatiotemporal Forecasting",
    authors: ["Dr. Elena Whitfield", "M. Torres"],
    venue: "Uncertainty in Artificial Intelligence (UAI)",
    type: "Conference Paper",
    abstract:
      "We introduce a sparse variational approximation for Gaussian process regression that scales to spatiotemporal datasets with millions of observations, applied to city-scale air quality forecasting with strong empirical uncertainty calibration.",
    researchAreas: ["Machine Learning", "Data Science", "Time Series Analysis"],
    doi: "https://doi.org/10.5555/uai.2018.088217",
  },
  {
    id: 22,
    year: 2018,
    title: "Robotic Manipulation Under Partial Observability: A Survey",
    authors: ["Dr. Elena Whitfield", "H. Nakamura"],
    venue: "Foundations and Trends in Robotics",
    type: "Book Chapter",
    abstract:
      "This chapter reviews approaches to robotic manipulation under partial observability, organizing the literature around belief-space planning, learned state estimators, and hybrid control architectures, with an emphasis on practical deployment considerations.",
    researchAreas: ["Robotics", "Artificial Intelligence"],
    pdfUrl: "https://drive.google.com/file/d/1M5nOpQrStUvWxYz1a2B3c4D5e6F7G8H/view",
  },
  {
    id: 23,
    year: 2017,
    title: "Transfer Learning Across Imaging Modalities in Ophthalmology",
    authors: ["Dr. Elena Whitfield", "S. Patel", "L. Fontaine"],
    venue: "Ophthalmic Technologies Conference (SPIE)",
    type: "Conference Paper",
    abstract:
      "We study cross-modality transfer learning between fundus photography and optical coherence tomography for diabetic retinopathy screening, showing that pretraining on the source modality reduces the labeled data needed on the target modality by half.",
    researchAreas: ["Healthcare AI", "Computer Vision"],
    doi: "https://doi.org/10.1117/12.2017.264510",
  },
  {
    id: 24,
    year: 2017,
    title: "Early Stopping Criteria for Deep Reinforcement Learning",
    authors: ["Dr. Elena Whitfield", "A. Kumar", "T. Bergström"],
    venue: "arXiv preprint",
    type: "Preprint",
    abstract:
      "We analyze common early stopping heuristics for deep reinforcement learning agents and show that reward-based criteria alone are unreliable predictors of policy robustness, proposing a lightweight diagnostic based on value function variance.",
    researchAreas: ["Machine Learning", "Artificial Intelligence"],
    pdfUrl: "https://drive.google.com/file/d/1N6oPqRsTuVwXyZ1a2B3c4D5e6F7G8H9/view",
  },
  {
    id: 25,
    year: 2016,
    title: "A Comparative Study of Kernel Methods for Small-Sample Genomics",
    authors: ["Dr. Elena Whitfield", "R. Chen"],
    venue: "Bioinformatics",
    type: "Journal Article",
    abstract:
      "This study compares kernel-based learning methods for genomic prediction tasks with small sample sizes, finding that carefully regularized kernel ridge regression remains competitive with more complex deep learning baselines in this regime.",
    researchAreas: ["Data Science", "Machine Learning"],
    doi: "https://doi.org/10.1093/bioinformatics/btw2016.041",
  },
  {
    id: 26,
    year: 2016,
    title: "Designing Conversational Interfaces for Older Adults",
    authors: ["Dr. Elena Whitfield", "J. Okoye"],
    venue: "ACM Conference on Human Factors in Computing Systems (CHI)",
    type: "Conference Paper",
    abstract:
      "Through a mixed-methods study with 42 older adult participants, we identify design patterns for conversational interfaces that reduce interaction errors and improve trust, informing guidelines later adopted in two commercial voice assistant products.",
    researchAreas: ["Human-Computer Interaction", "Artificial Intelligence"],
    pdfUrl: "https://drive.google.com/file/d/1O7pQrStUvWxYz1a2B3c4D5e6F7G8H9I/view",
    doi: "https://doi.org/10.1145/2016.chi.290144",
  },
];
