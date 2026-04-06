const FinancialRecord = require("../models/FinancialRecord");

const getDashboardSummary = async (req, res) => {
  const totalIncomeAgg = await FinancialRecord.aggregate([
    { $match: { type: "income" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalExpenseAgg = await FinancialRecord.aggregate([
    { $match: { type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const categoryTotals = await FinancialRecord.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
  ]);

  const monthlyTrends = await FinancialRecord.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const recentActivity = await FinancialRecord.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("createdBy", "name email role");

  const totalIncome = totalIncomeAgg[0]?.total || 0;
  const totalExpenses = totalExpenseAgg[0]?.total || 0;

  res.json({
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    categoryTotals,
    monthlyTrends,
    recentActivity,
  });
};

module.exports = { getDashboardSummary };
