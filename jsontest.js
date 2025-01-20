
function TreeNode(val, left, right) {
   this.val = (val===undefined ? 0 : val)
   this.left = (left===undefined ? null : left)
   this.right = (right===undefined ? null : right)
 }

/**
 * @param {TreeNode} root
 * @return {number}
 */


var kthSmallest = function(root, k) {
    var result=[];
    const dfs=(root)=>{
        dfs(root.left);
        result.push(root);
        dfs(root.right);
    }
    dfs(root);
    return result[]
};
// var search = function(nums, target) {
//     let left=0,right=nums.length-1;
//     while(left<=right){
//         let mid=Math.floor((left+right)/2);
//         if(nums[mid]===target){
//             return mid;
//         }
//         else if(nums[left]<=nums[mid]){
//             if(nums[left]<=target&&target<nums[mid]){
//                 right=mid-1;
//             }
//             else{
//                 left=mid+1;
//             }
//         }
//         else{
//             if(nums[right]>=target&&target>nums[mid]){
//                 left=mid+1;
//             }
//             else{
//                 right=mid-1;
//             }
//         }
//     }
//     return -1;
// };
// let nums = [4,5,6,7,0,1,2], target = 0
// console.log(search(nums,target));