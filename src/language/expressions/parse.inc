/* src/language/expressions/parse.inc
   Generated from ./src/language/expressions/operations.def by generate.pl.
   Do not modify! */

{"", "", 0, 0, 0, {}, 0, 0},
{"number", "number", 0, OP_number, 0, {}, 0, 0},
{"string", "string", 0, OP_string, 0, {}, 0, 0},
{"boolean", "boolean", 0, OP_boolean, 0, {}, 0, 0},
{"format", "format", 0, OP_format, 0, {}, 0, 0},
{"ni_format", "num_input_format", 0, OP_ni_format, 0, {}, 0, 0},
{"no_format", "num_output_format", 0, OP_no_format, 0, {}, 0, 0},
{"integer", "integer", 0, OP_integer, 0, {}, 0, 0},
{"pos_int", "positive_integer_constant", 0, OP_pos_int, 0, {}, 0, 0},
{"variable", "variable", 0, OP_variable, 0, {}, 0, 0},
{"num_var", "num_variable", 0, OP_num_var, 0, {}, 0, 0},
{"str_var", "string_variable", 0, OP_str_var, 0, {}, 0, 0},
{"var", "variable", 0, OP_var, 0, {}, 0, 0},
{"vector", "vector", 0, OP_vector, 0, {}, 0, 0},
{"return_number", "return_number", 0, OP_return_number, 0, {}, 0, 0},
{"return_string", "return_string", 0, OP_return_string, 0, {}, 0, 0},
{"operation", "operation", 0, OP_operation, 0, {}, 0, 0},
{"ABS", "ABS(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"ACOS", "ACOS(number)", OPF_EXTENSION, OP_number, 1, {OP_number}, 0, 0},
{"ANY", "ANY(number, number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND, OP_boolean, 2, {OP_number, OP_number}, 0, 1},
{"ANY", "ANY(string, string[, string]...)", OPF_ARRAY_OPERAND, OP_boolean, 2, {OP_string, OP_string}, 0, 1},
{"ARCOS", "ARCOS(number)", OPF_EXTENSION, OP_number, 1, {OP_number}, 0, 0},
{"ARSIN", "ARSIN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"ARTAN", "ARTAN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"ASIN", "ASIN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"ATAN", "ATAN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"CDF.BERNOULLI", "CDF.BERNOULLI(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.BETA", "CDF.BETA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.BINOM", "CDF.BINOM(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.BVNOR", "CDF.BVNOR(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.CAUCHY", "CDF.CAUCHY(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.CHISQ", "CDF.CHISQ(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.EXP", "CDF.EXP(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.F", "CDF.F(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.GAMMA", "CDF.GAMMA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.GEOM", "CDF.GEOM(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.HALFNRM", "CDF.HALFNRM(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.HYPER", "CDF.HYPER(number, number, number, number)", 0, OP_number, 4, {OP_number, OP_number, OP_number, OP_number}, 0, 0},
{"CDF.IGAUSS", "CDF.IGAUSS(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.LAPLACE", "CDF.LAPLACE(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.LNORMAL", "CDF.LNORMAL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.LOGISTIC", "CDF.LOGISTIC(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.NEGBIN", "CDF.NEGBIN(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.NORMAL", "CDF.NORMAL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.PARETO", "CDF.PARETO(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.POISSON", "CDF.POISSON(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.RAYLEIGH", "CDF.RAYLEIGH(number, number)", OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.SMOD", "CDF.SMOD(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.SRANGE", "CDF.SRANGE(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.T", "CDF.T(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"CDF.T1G", "CDF.T1G(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.T2G", "CDF.T2G(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.UNIFORM", "CDF.UNIFORM(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDF.WEIBULL", "CDF.WEIBULL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"CDFNORM", "CDFNORM(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"CFVAR", "CFVAR(number, number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 2, 1},
{"CONCAT", "CONCAT(string[, string]...)", OPF_ARRAY_OPERAND, OP_string, 1, {OP_string}, 0, 1},
{"COS", "COS(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"CTIME.DAYS", "CTIME.DAYS(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"CTIME.HOURS", "CTIME.HOURS(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"CTIME.MINUTES", "CTIME.MINUTES(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"CTIME.SECONDS", "CTIME.SECONDS(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"DATE.DMY", "DATE.DMY(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"DATE.MDY", "DATE.MDY(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"DATE.MOYR", "DATE.MOYR(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"DATE.QYR", "DATE.QYR(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"DATE.WKYR", "DATE.WKYR(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"DATE.YRDAY", "DATE.YRDAY(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"DATEDIFF", "DATEDIFF(number, number, string)", OPF_NO_ABBREV, OP_number, 3, {OP_number, OP_number, OP_string}, 0, 0},
{"DATESUM", "DATESUM(number, number, string)", OPF_NO_ABBREV, OP_number, 3, {OP_number, OP_number, OP_string}, 0, 0},
{"DATESUM", "DATESUM(number, number, string, string)", OPF_NO_ABBREV, OP_number, 4, {OP_number, OP_number, OP_string, OP_string}, 0, 0},
{"EXP", "EXP(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"IDF.BETA", "IDF.BETA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.CAUCHY", "IDF.CAUCHY(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.CHISQ", "IDF.CHISQ(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"IDF.EXP", "IDF.EXP(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"IDF.F", "IDF.F(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.GAMMA", "IDF.GAMMA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.HALFNRM", "IDF.HALFNRM(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.IGAUSS", "IDF.IGAUSS(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.LAPLACE", "IDF.LAPLACE(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.LNORMAL", "IDF.LNORMAL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.LOGISTIC", "IDF.LOGISTIC(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.NORMAL", "IDF.NORMAL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.PARETO", "IDF.PARETO(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.RAYLEIGH", "IDF.RAYLEIGH(number, number)", OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"IDF.SMOD", "IDF.SMOD(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.SRANGE", "IDF.SRANGE(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.T", "IDF.T(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"IDF.T1G", "IDF.T1G(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.T2G", "IDF.T2G(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.UNIFORM", "IDF.UNIFORM(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"IDF.WEIBULL", "IDF.WEIBULL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"INDEX", "INDEX(string, string)", 0, OP_number, 2, {OP_string, OP_string}, 0, 0},
{"INDEX", "INDEX(string, string, number)", 0, OP_number, 3, {OP_string, OP_string, OP_number}, 0, 0},
{"LAG", "LAG(num_variable)", OPF_NONOPTIMIZABLE | OPF_PERM_ONLY, OP_number, 1, {OP_num_var}, 0, 0},
{"LAG", "LAG(num_variable, positive_integer_constant)", OPF_NONOPTIMIZABLE | OPF_PERM_ONLY, OP_number, 2, {OP_num_var, OP_pos_int}, 0, 0},
{"LAG", "LAG(string_variable)", OPF_NONOPTIMIZABLE | OPF_PERM_ONLY, OP_string, 1, {OP_str_var}, 0, 0},
{"LAG", "LAG(string_variable, positive_integer_constant)", OPF_NONOPTIMIZABLE | OPF_PERM_ONLY, OP_string, 2, {OP_str_var, OP_pos_int}, 0, 0},
{"LENGTH", "LENGTH(string)", 0, OP_number, 1, {OP_string}, 0, 0},
{"LG10", "LG10(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"LN", "LN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"LNGAMMA", "LNGAMMA(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"LOWER", "LOWER(string)", 0, OP_string, 1, {OP_string}, 0, 0},
{"LPAD", "LPAD(string, number)", OPF_ABSORB_MISS, OP_string, 2, {OP_string, OP_number}, 0, 0},
{"LPAD", "LPAD(string, number, string)", OPF_ABSORB_MISS, OP_string, 3, {OP_string, OP_number, OP_string}, 0, 0},
{"LTRIM", "LTRIM(string)", 0, OP_string, 1, {OP_string}, 0, 0},
{"LTRIM", "LTRIM(string, string)", 0, OP_string, 2, {OP_string, OP_string}, 0, 0},
{"MAX", "MAX(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 1, 1},
{"MAX", "MAX(string[, string]...)", OPF_ARRAY_OPERAND, OP_string, 1, {OP_string}, 0, 1},
{"MBLEN.BYTE", "MBLEN.BYTE(string, number)", 0, OP_number, 2, {OP_string, OP_number}, 0, 0},
{"MEAN", "MEAN(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 1, 1},
{"MEDIAN", "MEDIAN(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 1, 1},
{"MIN", "MIN(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 1, 1},
{"MIN", "MIN(string[, string]...)", OPF_ARRAY_OPERAND, OP_string, 1, {OP_string}, 0, 1},
{"MISSING", "MISSING(number)", OPF_ABSORB_MISS, OP_boolean, 1, {OP_number}, 0, 0},
{"MOD", "MOD(number, number)", OPF_ABSORB_MISS, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"MOD10", "MOD10(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"NCDF.BETA", "NCDF.BETA(number, number, number, number)", 0, OP_number, 4, {OP_number, OP_number, OP_number, OP_number}, 0, 0},
{"NCDF.CHISQ", "NCDF.CHISQ(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"NCDF.F", "NCDF.F(number, number, number, number)", OPF_UNIMPLEMENTED, OP_number, 4, {OP_number, OP_number, OP_number, OP_number}, 0, 0},
{"NCDF.T", "NCDF.T(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"NMISS", "NMISS(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND, OP_number, 1, {OP_number}, 0, 1},
{"NORMAL", "NORMAL(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"NPDF.BETA", "NPDF.BETA(number, number, number, number)", 0, OP_number, 4, {OP_number, OP_number, OP_number, OP_number}, 0, 0},
{"NPDF.CHISQ", "NPDF.CHISQ(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"NPDF.F", "NPDF.F(number, number, number, number)", OPF_UNIMPLEMENTED, OP_number, 4, {OP_number, OP_number, OP_number, OP_number}, 0, 0},
{"NPDF.T", "NPDF.T(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"NUMBER", "NUMBER(string, num_input_format)", 0, OP_number, 2, {OP_string, OP_ni_format}, 0, 0},
{"NVALID", "NVALID(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND, OP_number, 1, {OP_number}, 0, 1},
{"PDF.BERNOULLI", "PDF.BERNOULLI(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.BETA", "PDF.BETA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.BINOM", "PDF.BINOM(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.BVNOR", "PDF.BVNOR(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.CAUCHY", "PDF.CAUCHY(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.CHISQ", "PDF.CHISQ(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.EXP", "PDF.EXP(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.F", "PDF.F(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.GAMMA", "PDF.GAMMA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.GEOM", "PDF.GEOM(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.HALFNRM", "PDF.HALFNRM(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.HYPER", "PDF.HYPER(number, number, number, number)", 0, OP_number, 4, {OP_number, OP_number, OP_number, OP_number}, 0, 0},
{"PDF.IGAUSS", "PDF.IGAUSS(number, number, number)", OPF_UNIMPLEMENTED, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.LANDAU", "PDF.LANDAU(number)", OPF_EXTENSION, OP_number, 1, {OP_number}, 0, 0},
{"PDF.LAPLACE", "PDF.LAPLACE(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.LNORMAL", "PDF.LNORMAL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.LOG", "PDF.LOG(number, number)", OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.LOGISTIC", "PDF.LOGISTIC(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.NEGBIN", "PDF.NEGBIN(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.NORMAL", "PDF.NORMAL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.NTAIL", "PDF.NTAIL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.PARETO", "PDF.PARETO(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.POISSON", "PDF.POISSON(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.RAYLEIGH", "PDF.RAYLEIGH(number, number)", OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.RTAIL", "PDF.RTAIL(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.T", "PDF.T(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"PDF.T1G", "PDF.T1G(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.T2G", "PDF.T2G(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.UNIFORM", "PDF.UNIFORM(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.WEIBULL", "PDF.WEIBULL(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PDF.XPOWER", "PDF.XPOWER(number, number, number)", OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"PROBIT", "PROBIT(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"RANGE", "RANGE(number, number, number[, number, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND, OP_boolean, 2, {OP_number, OP_number}, 0, 2},
{"RANGE", "RANGE(string, string, string[, string, string]...)", OPF_ARRAY_OPERAND, OP_boolean, 2, {OP_string, OP_string}, 0, 2},
{"REPLACE", "REPLACE(string, string, string)", 0, OP_string, 3, {OP_string, OP_string, OP_string}, 0, 0},
{"REPLACE", "REPLACE(string, string, string, number)", OPF_ABSORB_MISS, OP_string, 4, {OP_string, OP_string, OP_string, OP_number}, 0, 0},
{"RINDEX", "RINDEX(string, string)", 0, OP_number, 2, {OP_string, OP_string}, 0, 0},
{"RINDEX", "RINDEX(string, string, number)", 0, OP_number, 3, {OP_string, OP_string, OP_number}, 0, 0},
{"RND", "RND(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"RND", "RND(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RND", "RND(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"RPAD", "RPAD(string, number)", OPF_ABSORB_MISS, OP_string, 2, {OP_string, OP_number}, 0, 0},
{"RPAD", "RPAD(string, number, string)", OPF_ABSORB_MISS, OP_string, 3, {OP_string, OP_number, OP_string}, 0, 0},
{"RTRIM", "RTRIM(string)", 0, OP_string, 1, {OP_string}, 0, 0},
{"RTRIM", "RTRIM(string, string)", 0, OP_string, 2, {OP_string, OP_string}, 0, 0},
{"RV.BERNOULLI", "RV.BERNOULLI(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"RV.BETA", "RV.BETA(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.BINOM", "RV.BINOM(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.CAUCHY", "RV.CAUCHY(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.CHISQ", "RV.CHISQ(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"RV.EXP", "RV.EXP(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"RV.F", "RV.F(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.GAMMA", "RV.GAMMA(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.GEOM", "RV.GEOM(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"RV.HALFNRM", "RV.HALFNRM(number, number)", OPF_NONOPTIMIZABLE | OPF_UNIMPLEMENTED, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.HYPER", "RV.HYPER(number, number, number)", OPF_NONOPTIMIZABLE, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"RV.IGAUSS", "RV.IGAUSS(number, number)", OPF_NONOPTIMIZABLE | OPF_UNIMPLEMENTED, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.LANDAU", "RV.LANDAU()", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 0, {}, 0, 0},
{"RV.LAPLACE", "RV.LAPLACE(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.LEVY", "RV.LEVY(number, number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.LNORMAL", "RV.LNORMAL(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.LOG", "RV.LOG(number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 1, {OP_number}, 0, 0},
{"RV.LOGISTIC", "RV.LOGISTIC(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.LVSKEW", "RV.LVSKEW(number, number, number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"RV.NEGBIN", "RV.NEGBIN(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.NORMAL", "RV.NORMAL(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.NTAIL", "RV.NTAIL(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.PARETO", "RV.PARETO(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.POISSON", "RV.POISSON(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"RV.RAYLEIGH", "RV.RAYLEIGH(number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 1, {OP_number}, 0, 0},
{"RV.RTAIL", "RV.RTAIL(number, number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.T", "RV.T(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"RV.T1G", "RV.T1G(number, number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.T2G", "RV.T2G(number, number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.UNIFORM", "RV.UNIFORM(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.WEIBULL", "RV.WEIBULL(number, number)", OPF_NONOPTIMIZABLE, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"RV.XPOWER", "RV.XPOWER(number, number)", OPF_NONOPTIMIZABLE | OPF_EXTENSION, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"SD", "SD(number, number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 2, 1},
{"SIG.CHISQ", "SIG.CHISQ(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"SIG.F", "SIG.F(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"SIN", "SIN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"SQRT", "SQRT(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"STRING", "STRING(number, num_output_format)", OPF_ABSORB_MISS, OP_string, 2, {OP_number, OP_no_format}, 0, 0},
{"STRUNC", "STRUNC(string, number)", OPF_ABSORB_MISS, OP_string, 2, {OP_string, OP_number}, 0, 0},
{"SUBSTR", "SUBSTR(string, number)", OPF_ABSORB_MISS, OP_string, 2, {OP_string, OP_number}, 0, 0},
{"SUBSTR", "SUBSTR(string, number, number)", OPF_ABSORB_MISS, OP_string, 3, {OP_string, OP_number, OP_number}, 0, 0},
{"SUM", "SUM(number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 1, 1},
{"SYSMIS", "SYSMIS(num_variable)", OPF_NONOPTIMIZABLE, OP_boolean, 1, {OP_num_var}, 0, 0},
{"SYSMIS", "SYSMIS(number)", OPF_ABSORB_MISS, OP_boolean, 1, {OP_number}, 0, 0},
{"TAN", "TAN(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"TIME.DAYS", "TIME.DAYS(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"TIME.HMS", "TIME.HMS(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"TRUNC", "TRUNC(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"TRUNC", "TRUNC(number, number)", 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"TRUNC", "TRUNC(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"UNIFORM", "UNIFORM(number)", OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"UPCASE", "UPCASE(string)", 0, OP_string, 1, {OP_string}, 0, 0},
{"VALUE", "VALUE(num_variable)", OPF_NONOPTIMIZABLE, OP_boolean, 1, {OP_num_var}, 0, 0},
{"VALUELABEL", "VALUELABEL(variable)", OPF_ABSORB_MISS | OPF_NONOPTIMIZABLE | OPF_NO_ABBREV, OP_string, 1, {OP_var}, 0, 0},
{"VARIANCE", "VARIANCE(number, number[, number]...)", OPF_ABSORB_MISS | OPF_ARRAY_OPERAND | OPF_MIN_VALID, OP_number, 1, {OP_number}, 2, 1},
{"XDATE.DATE", "XDATE.DATE(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.HOUR", "XDATE.HOUR(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.JDAY", "XDATE.JDAY(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.MDAY", "XDATE.MDAY(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.MINUTE", "XDATE.MINUTE(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.MONTH", "XDATE.MONTH(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.QUARTER", "XDATE.QUARTER(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.SECOND", "XDATE.SECOND(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.TDAY", "XDATE.TDAY(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.TIME", "XDATE.TIME(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.WEEK", "XDATE.WEEK(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.WKDAY", "XDATE.WKDAY(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"XDATE.YEAR", "XDATE.YEAR(number)", 0, OP_number, 1, {OP_number}, 0, 0},
{"YRMODA", "YRMODA(number, number, number)", 0, OP_number, 3, {OP_number, OP_number, OP_number}, 0, 0},
{"ADD", NULL, 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"AND", NULL, OPF_ABSORB_MISS, OP_boolean, 2, {OP_boolean, OP_boolean}, 0, 0},
{"BOOLEAN_TO_NUM", NULL, 0, OP_number, 1, {OP_boolean}, 0, 0},
{"CASENUM", NULL, OPF_NONOPTIMIZABLE, OP_number, 0, {}, 0, 0},
{"DIV", NULL, OPF_ABSORB_MISS, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"EQ", NULL, 0, OP_boolean, 2, {OP_number, OP_number}, 0, 0},
{"EQ_STRING", NULL, 0, OP_boolean, 2, {OP_string, OP_string}, 0, 0},
{"GE", NULL, 0, OP_boolean, 2, {OP_number, OP_number}, 0, 0},
{"GE_STRING", NULL, 0, OP_boolean, 2, {OP_string, OP_string}, 0, 0},
{"GT", NULL, 0, OP_boolean, 2, {OP_number, OP_number}, 0, 0},
{"GT_STRING", NULL, 0, OP_boolean, 2, {OP_string, OP_string}, 0, 0},
{"LE", NULL, 0, OP_boolean, 2, {OP_number, OP_number}, 0, 0},
{"LE_STRING", NULL, 0, OP_boolean, 2, {OP_string, OP_string}, 0, 0},
{"LT", NULL, 0, OP_boolean, 2, {OP_number, OP_number}, 0, 0},
{"LT_STRING", NULL, 0, OP_boolean, 2, {OP_string, OP_string}, 0, 0},
{"MUL", NULL, OPF_ABSORB_MISS, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"NE", NULL, 0, OP_boolean, 2, {OP_number, OP_number}, 0, 0},
{"NEG", NULL, 0, OP_number, 1, {OP_number}, 0, 0},
{"NE_STRING", NULL, 0, OP_boolean, 2, {OP_string, OP_string}, 0, 0},
{"NOT", NULL, 0, OP_boolean, 1, {OP_boolean}, 0, 0},
{"NUM_SYS", NULL, OPF_NONOPTIMIZABLE, OP_number, 0, {}, 0, 0},
{"NUM_TO_BOOLEAN", NULL, 0, OP_boolean, 2, {OP_number, OP_string}, 0, 0},
{"NUM_VAL", NULL, OPF_NONOPTIMIZABLE, OP_number, 0, {}, 0, 0},
{"NUM_VAR", NULL, OPF_NONOPTIMIZABLE, OP_number, 0, {}, 0, 0},
{"OR", NULL, OPF_ABSORB_MISS, OP_boolean, 2, {OP_boolean, OP_boolean}, 0, 0},
{"POW", NULL, OPF_ABSORB_MISS, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"SQUARE", NULL, 0, OP_number, 1, {OP_number}, 0, 0},
{"STR_VAR", NULL, OPF_NONOPTIMIZABLE, OP_string, 0, {}, 0, 0},
{"SUB", NULL, 0, OP_number, 2, {OP_number, OP_number}, 0, 0},
{"VEC_ELEM_NUM", NULL, OPF_NONOPTIMIZABLE, OP_number, 1, {OP_number}, 0, 0},
{"VEC_ELEM_STR", NULL, OPF_ABSORB_MISS | OPF_NONOPTIMIZABLE, OP_string, 1, {OP_number}, 0, 0},

/*
   Local Variables:
   mode: c
   buffer-read-only: t
   End:
*/
