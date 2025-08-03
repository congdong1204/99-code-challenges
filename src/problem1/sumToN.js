// Implementation A: Mathematical Formula (O(1) time complexity)
// Uses the arithmetic series formula: n * (n + 1) / 2
var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2
}

// Implementation B: Iterative Loop (O(n) time complexity)
// Traditional for loop approach
var sum_to_n_b = function (n) {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

// Implementation C: Recursive Approach (O(n) time complexity)
// Uses recursion with base case
var sum_to_n_c = function (n) {
  if (n <= 1) {
    return n
  }
  return n + sum_to_n_c(n - 1)
}

// Test cases to verify all implementations work correctly
console.log('Testing with n = 5:')
console.log('sum_to_n_a(5):', sum_to_n_a(5)) // Expected result: 15
console.log('sum_to_n_b(5):', sum_to_n_b(5)) // Expected result: 15
console.log('sum_to_n_c(5):', sum_to_n_c(5)) // Expected result: 15

console.log('\nTesting with n = 10:')
console.log('sum_to_n_a(10):', sum_to_n_a(10)) // Expected result: 55
console.log('sum_to_n_b(10):', sum_to_n_b(10)) // Expected result: 55
console.log('sum_to_n_c(10):', sum_to_n_c(10)) // Expected result: 55

console.log('\nTesting edge cases:')
console.log('sum_to_n_a(0):', sum_to_n_a(0)) // Expected result: 0
console.log('sum_to_n_b(0):', sum_to_n_b(0)) // Expected result: 0
console.log('sum_to_n_c(0):', sum_to_n_c(0)) // Expected result: 0

console.log('sum_to_n_a(1):', sum_to_n_a(1)) // Expected result: 1
console.log('sum_to_n_b(1):', sum_to_n_b(1)) // Expected result: 1
console.log('sum_to_n_c(1):', sum_to_n_c(1)) // Expected result: 1
