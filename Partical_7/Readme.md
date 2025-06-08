#  Practical 7 - Data Visualization 

This project is an interactive data visualization dashboard developed using **React** and **Recharts**, designed to present business insights such as sales performance, customer data, and visitor trends through visual charts.

---

##  Objective

The main goal of this practical is to demonstrate the use of a charting library (Recharts) within a modern React-based application to visualize business data effectively and responsively.

---

##  Dashboard Highlights

The dashboard consists of four main data visualization components:

### 1. Sales Overview (Line Chart)
- Visualizes monthly sales figures against set targets.
- Dual-line format helps compare actual vs. expected performance.
- Interactive and styled using gradients for better readability.

### 2.  Market Share Breakdown (Pie Chart)
- Displays distribution of products by category.
- Ideal for understanding which product lines dominate.
- Labels show percentage values and interactive segments.

### 3.  Customer Insights (Bar Chart)
- Compares new vs returning customers by quarter.
- Grouped bar layout with rounded styling for aesthetics.
- Useful for assessing customer acquisition trends.

### 4.  Visitor Traffic (Area Chart)
- Shows weekly visitor patterns with smooth curves.
- Area gradient fill enhances visual flow.
- Helpful for identifying peak engagement days.

---

## Tools & Technologies

| Tool         | Purpose                          |
|--------------|----------------------------------|
| React        | Frontend UI                      |
| Recharts     | Data visualization               |
| Tailwind CSS | Styling and responsive layout    |
| TypeScript   | Type safety for components       |
| Lucide Icons | Iconography                      |
| Next.js (App Router) | Application framework    |

---

##  Project Folder Structure

```
src/
│
├── app/
│   ├── page.tsx          # Dashboard entry point
│   └── layout.tsx        # Common layout template
│
├── components/
│   ├── SalesChart.tsx
│   ├── MarketShareChart.tsx
│   ├── CustomerChart.tsx
│   └── VisitorChart.tsx
│
├── styles/
│   └── globals.css       # Tailwind CSS
```

---

## ⚙️ Getting Started

To set up and run the dashboard on your local machine:

### Step 1: Clone the repository
```bash
git clone https://github.com/SangayZin/SS2025_WEB102_02230298/blob/main/Practical_7
cd data-dashboard-practical7
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Add Recharts
```bash
npm install recharts
```

### Step 4: Start the development server
```bash
npm run dev
```

Open your browser and visit http://localhost:3000 to see the dashboard in action.

---

##  Data Model Example

Example data for the Sales Overview chart:

```ts
const salesData = [
  { month: 'January', sales: 4200, target: 4000 },
  { month: 'February', sales: 3800, target: 3900 },
  // More data...
]
```

Each chart component follows a similar format—predefined mock data passed as props and rendered inside a ResponsiveContainer to adapt to different screen sizes.

---

##  Special Features

- **Interactive Tooltips**: All charts show detailed data on hover.
- **Fully Responsive**: Layout adjusts to mobile and desktop screens.
- **Custom Gradients**: Visual appeal using SVG linear gradients.
- **Performance Friendly**: Components are isolated and memoized.

---

## Why This Matters

Visualizing data helps stakeholders and developers alike to:

- Spot trends and anomalies quickly
- Make data-driven decisions
- Communicate insights effectively

This practical reinforced how frontend developers can turn raw numbers into compelling visual narratives using chart libraries like Recharts.

---

##  Future Improvements

Here are some ideas that could enhance the dashboard further:

- Use real-time API data instead of mock data
- Add chart filters (by month, category, etc.)
- Export chart data to CSV
- Dark mode toggle for better UX