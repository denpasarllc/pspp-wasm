/* src/language/expressions/operations.h
   Generated from ./src/language/expressions/operations.def by generate.pl.
   Do not modify! */

#include <stdlib.h>
#include <stdbool.h>

typedef enum  {
    /* Atom types. */
    OP_number = 1,
    OP_string,
    OP_boolean,
    OP_format,
    OP_ni_format,
    OP_no_format,
    OP_integer,
    OP_pos_int,
    OP_variable,
    OP_num_var,
    OP_str_var,
    OP_var,
    OP_vector,
    OP_return_number,
    OP_return_string,
    OP_operation,
    OP_atom_first = OP_number,
    OP_atom_last = OP_operation,
    OP_atom_cnt = OP_atom_last - OP_atom_first + 1,

    /* Function types. */
    OP_ABS_n = OP_atom_last + 1,
    OP_ACOS_n,
    OP_ANY_nn,
    OP_ANY_ss,
    OP_ARCOS_n,
    OP_ARSIN_n,
    OP_ARTAN_n,
    OP_ASIN_n,
    OP_ATAN_n,
    OP_CDF_BERNOULLI_nn,
    OP_CDF_BETA_nnn,
    OP_CDF_BINOM_nnn,
    OP_CDF_BVNOR_nnn,
    OP_CDF_CAUCHY_nnn,
    OP_CDF_CHISQ_nn,
    OP_CDF_EXP_nn,
    OP_CDF_F_nnn,
    OP_CDF_GAMMA_nnn,
    OP_CDF_GEOM_nn,
    OP_CDF_HALFNRM_nnn,
    OP_CDF_HYPER_nnnn,
    OP_CDF_IGAUSS_nnn,
    OP_CDF_LAPLACE_nnn,
    OP_CDF_LNORMAL_nnn,
    OP_CDF_LOGISTIC_nnn,
    OP_CDF_NEGBIN_nnn,
    OP_CDF_NORMAL_nnn,
    OP_CDF_PARETO_nnn,
    OP_CDF_POISSON_nn,
    OP_CDF_RAYLEIGH_nn,
    OP_CDF_SMOD_nnn,
    OP_CDF_SRANGE_nnn,
    OP_CDF_T_nn,
    OP_CDF_T1G_nnn,
    OP_CDF_T2G_nnn,
    OP_CDF_UNIFORM_nnn,
    OP_CDF_WEIBULL_nnn,
    OP_CDFNORM_n,
    OP_CFVAR_n,
    OP_CONCAT_s,
    OP_COS_n,
    OP_CTIME_DAYS_n,
    OP_CTIME_HOURS_n,
    OP_CTIME_MINUTES_n,
    OP_CTIME_SECONDS_n,
    OP_DATE_DMY_nnn,
    OP_DATE_MDY_nnn,
    OP_DATE_MOYR_nn,
    OP_DATE_QYR_nn,
    OP_DATE_WKYR_nn,
    OP_DATE_YRDAY_nn,
    OP_DATEDIFF_nns,
    OP_DATESUM_nns,
    OP_DATESUM_nnss,
    OP_EXP_n,
    OP_IDF_BETA_nnn,
    OP_IDF_CAUCHY_nnn,
    OP_IDF_CHISQ_nn,
    OP_IDF_EXP_nn,
    OP_IDF_F_nnn,
    OP_IDF_GAMMA_nnn,
    OP_IDF_HALFNRM_nnn,
    OP_IDF_IGAUSS_nnn,
    OP_IDF_LAPLACE_nnn,
    OP_IDF_LNORMAL_nnn,
    OP_IDF_LOGISTIC_nnn,
    OP_IDF_NORMAL_nnn,
    OP_IDF_PARETO_nnn,
    OP_IDF_RAYLEIGH_nn,
    OP_IDF_SMOD_nnn,
    OP_IDF_SRANGE_nnn,
    OP_IDF_T_nn,
    OP_IDF_T1G_nnn,
    OP_IDF_T2G_nnn,
    OP_IDF_UNIFORM_nnn,
    OP_IDF_WEIBULL_nnn,
    OP_INDEX_ss,
    OP_INDEX_ssn,
    OP_LAG_Vn,
    OP_LAG_Vnn,
    OP_LAG_Vs,
    OP_LAG_Vsn,
    OP_LENGTH_s,
    OP_LG10_n,
    OP_LN_n,
    OP_LNGAMMA_n,
    OP_LOWER_s,
    OP_LPAD_sn,
    OP_LPAD_sns,
    OP_LTRIM_s,
    OP_LTRIM_ss,
    OP_MAX_n,
    OP_MAX_s,
    OP_MBLEN_BYTE_sn,
    OP_MEAN_n,
    OP_MEDIAN_n,
    OP_MIN_n,
    OP_MIN_s,
    OP_MISSING_n,
    OP_MOD_nn,
    OP_MOD10_n,
    OP_NCDF_BETA_nnnn,
    OP_NCDF_CHISQ_nnn,
    OP_NCDF_F_nnnn,
    OP_NCDF_T_nnn,
    OP_NMISS_n,
    OP_NORMAL_n,
    OP_NPDF_BETA_nnnn,
    OP_NPDF_CHISQ_nnn,
    OP_NPDF_F_nnnn,
    OP_NPDF_T_nnn,
    OP_NUMBER_sf,
    OP_NVALID_n,
    OP_PDF_BERNOULLI_nn,
    OP_PDF_BETA_nnn,
    OP_PDF_BINOM_nnn,
    OP_PDF_BVNOR_nnn,
    OP_PDF_CAUCHY_nnn,
    OP_PDF_CHISQ_nn,
    OP_PDF_EXP_nn,
    OP_PDF_F_nnn,
    OP_PDF_GAMMA_nnn,
    OP_PDF_GEOM_nn,
    OP_PDF_HALFNRM_nnn,
    OP_PDF_HYPER_nnnn,
    OP_PDF_IGAUSS_nnn,
    OP_PDF_LANDAU_n,
    OP_PDF_LAPLACE_nnn,
    OP_PDF_LNORMAL_nnn,
    OP_PDF_LOG_nn,
    OP_PDF_LOGISTIC_nnn,
    OP_PDF_NEGBIN_nnn,
    OP_PDF_NORMAL_nnn,
    OP_PDF_NTAIL_nnn,
    OP_PDF_PARETO_nnn,
    OP_PDF_POISSON_nn,
    OP_PDF_RAYLEIGH_nn,
    OP_PDF_RTAIL_nnn,
    OP_PDF_T_nn,
    OP_PDF_T1G_nnn,
    OP_PDF_T2G_nnn,
    OP_PDF_UNIFORM_nnn,
    OP_PDF_WEIBULL_nnn,
    OP_PDF_XPOWER_nnn,
    OP_PROBIT_n,
    OP_RANGE_nn,
    OP_RANGE_ss,
    OP_REPLACE_sss,
    OP_REPLACE_sssn,
    OP_RINDEX_ss,
    OP_RINDEX_ssn,
    OP_RND_n,
    OP_RND_nn,
    OP_RND_nnn,
    OP_RPAD_sn,
    OP_RPAD_sns,
    OP_RTRIM_s,
    OP_RTRIM_ss,
    OP_RV_BERNOULLI_n,
    OP_RV_BETA_nn,
    OP_RV_BINOM_nn,
    OP_RV_CAUCHY_nn,
    OP_RV_CHISQ_n,
    OP_RV_EXP_n,
    OP_RV_F_nn,
    OP_RV_GAMMA_nn,
    OP_RV_GEOM_n,
    OP_RV_HALFNRM_nn,
    OP_RV_HYPER_nnn,
    OP_RV_IGAUSS_nn,
    OP_RV_LANDAU_,
    OP_RV_LAPLACE_nn,
    OP_RV_LEVY_nn,
    OP_RV_LNORMAL_nn,
    OP_RV_LOG_n,
    OP_RV_LOGISTIC_nn,
    OP_RV_LVSKEW_nnn,
    OP_RV_NEGBIN_nn,
    OP_RV_NORMAL_nn,
    OP_RV_NTAIL_nn,
    OP_RV_PARETO_nn,
    OP_RV_POISSON_n,
    OP_RV_RAYLEIGH_n,
    OP_RV_RTAIL_nn,
    OP_RV_T_n,
    OP_RV_T1G_nn,
    OP_RV_T2G_nn,
    OP_RV_UNIFORM_nn,
    OP_RV_WEIBULL_nn,
    OP_RV_XPOWER_nn,
    OP_SD_n,
    OP_SIG_CHISQ_nn,
    OP_SIG_F_nnn,
    OP_SIN_n,
    OP_SQRT_n,
    OP_STRING_nf,
    OP_STRUNC_sn,
    OP_SUBSTR_sn,
    OP_SUBSTR_snn,
    OP_SUM_n,
    OP_SYSMIS_Vn,
    OP_SYSMIS_n,
    OP_TAN_n,
    OP_TIME_DAYS_n,
    OP_TIME_HMS_nnn,
    OP_TRUNC_n,
    OP_TRUNC_nn,
    OP_TRUNC_nnn,
    OP_UNIFORM_n,
    OP_UPCASE_s,
    OP_VALUE_Vn,
    OP_VALUELABEL_V,
    OP_VARIANCE_n,
    OP_XDATE_DATE_n,
    OP_XDATE_HOUR_n,
    OP_XDATE_JDAY_n,
    OP_XDATE_MDAY_n,
    OP_XDATE_MINUTE_n,
    OP_XDATE_MONTH_n,
    OP_XDATE_QUARTER_n,
    OP_XDATE_SECOND_n,
    OP_XDATE_TDAY_n,
    OP_XDATE_TIME_n,
    OP_XDATE_WEEK_n,
    OP_XDATE_WKDAY_n,
    OP_XDATE_YEAR_n,
    OP_YRMODA_nnn,
    OP_function_first = OP_ABS_n,
    OP_function_last = OP_YRMODA_nnn,
    OP_function_cnt = OP_function_last - OP_function_first + 1,

    /* Operator types. */
    OP_ADD = OP_function_last + 1,
    OP_AND,
    OP_BOOLEAN_TO_NUM,
    OP_CASENUM,
    OP_DIV,
    OP_EQ,
    OP_EQ_STRING,
    OP_GE,
    OP_GE_STRING,
    OP_GT,
    OP_GT_STRING,
    OP_LE,
    OP_LE_STRING,
    OP_LT,
    OP_LT_STRING,
    OP_MUL,
    OP_NE,
    OP_NEG,
    OP_NE_STRING,
    OP_NOT,
    OP_NUM_SYS,
    OP_NUM_TO_BOOLEAN,
    OP_NUM_VAL,
    OP_NUM_VAR,
    OP_OR,
    OP_POW,
    OP_SQUARE,
    OP_STR_VAR,
    OP_SUB,
    OP_VEC_ELEM_NUM,
    OP_VEC_ELEM_STR,
    OP_operator_first = OP_ADD,
    OP_operator_last = OP_VEC_ELEM_STR,
    OP_operator_cnt = OP_operator_last - OP_operator_first + 1,

    OP_composite_first = OP_function_first,
    OP_composite_last = OP_operator_last,
    OP_composite_cnt = OP_composite_last - OP_composite_first + 1,

    OP_first = OP_atom_first,
    OP_last = OP_composite_last,
    OP_cnt = OP_last - OP_first + 1
  }
operation_type, atom_type;

static inline bool
is_operation (operation_type op)
{
  return op >= OP_first && op <= OP_last;
}

static inline bool
is_atom (operation_type op)
{
  assert (is_operation (op));
  return op >= OP_atom_first && op <= OP_atom_last;
}

static inline bool
is_composite (operation_type op)
{
  assert (is_operation (op));
  return op >= OP_composite_first && op <= OP_composite_last;
}

static inline bool
is_function (operation_type op)
{
  assert (is_operation (op));
  return op >= OP_function_first && op <= OP_function_last;
}

static inline bool
is_operator (operation_type op)
{
  assert (is_operation (op));
  return op >= OP_operator_first && op <= OP_operator_last;
}

/*
   Local Variables:
   mode: c
   buffer-read-only: t
   End:
*/