/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let m=nums1.length,n=nums2.length;
    let i=0,j=0;
    let curr=0,prev=0;
    let midden=Math.floor((m+n)/2);
    for(let k=0;k<=midden;k++){
        prev=curr;
        if(j>=n||(i<m&&nums1[i]<nums2[j])){
            curr=nums1[i];
            i++;
        }else{
            curr=nums2[j];
            j++;
        }
    }
    let isodd=(m+n)%2!=0;//true=奇数
    let result=isodd?curr:(prev+curr)/2;
    console.log(result);
    return result;
};
//let nums1 = [1,2], nums2 = [3,4];
//findMedianSortedArrays(nums1,nums2);

/**
 * @param {number[]} nums
 * @return {number}
 */
let nums = [3,4,5,1,2];//output 1
var findMin = function(nums) {
    let left=0,right=nums.length-1;
    while(left<right){
        let curr=Math.floor((right+left)/2);
        if(nums[curr]>nums[right]){
            left=curr+1;         
        }else{
            right=curr;
        }      
    }

    return nums[left];
};
console.log(findMin(nums));

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    let dummy=new ListNode(0);
    dummy.next=head;
    let prev=dummy;
    for(let i=1;i<left;i++){
        prev=prev.next;
    }
    let curr=prev.next;
    for(let i=0;i<right-left;i++){
        let nextnode=curr.next;
        curr.next=nextnode.next;
        nextnode.next=prev.next;
        prev.next=nextnode;
    }
    return dummy.next;
}

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */

/**
 * Function description
 *Input: a = "1010", b = "1011"
Output: "10101"
 * @param {type} paramName Parameter description
 * @returns {returnType} Return description
 * @author shumx2
 * @date 2024-12-03
 */
// let a = "11", b = "1";
// var addBinary = function(a, b) {
//     let ans="";
//     let carry=0;
//     for(let i=a.length-1,j=b.length-1;i>=0||j>=0;i--,j--){
//         let number1=0,number2=0;
//         let tempsum=carry;
//         if(i>=0)number1=parseInt(a[i]);
//         if(j>=0)number2=parseInt(b[j]);
//         tempsum+=number1+number2;
//         if(tempsum>=2)carry=1;
//         else carry=0;
//         let result=tempsum%2;
//         ans+=result;
        
//     }
//     if(carry>0)ans+=1;
//     ans=ans.split("").reverse().join("");
//     return ans;
// };
// console.log(addBinary(a,b));
/**
 * @param {number[]} nums
 * @return {number[][]}
 * Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
// var permute = function(nums) {
//     let result=[];
//     const backtrace=(used,target)=>{
//         if(target.length===nums.length){
//             result.push([...target]);
//             return;
//         }
//         for(let i=0;i<nums.length;i++){
//             if(used[i])continue;
//             target.push(nums[i]);
//             used[i]=true;
//             backtrace(used,target);
//             target.pop();
//             used[i]=false;
//         }
//     };
//     backtrace(Array(nums.length).fill(false),[]);
//     return result;
// };
// let nums2 = [1,2,3];
// permute(nums2).forEach(element => {
//     console.log(element);
// });


/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    let result=0;
    let chessboard=Array.from({length:n},()=>Array(n).fill(','));
    const isValid=(chessboard,n,row,col)=>{
        for(let i=0;i<row;i++){//i is row
            if(chessboard[i][col]==='Q')return false;
            if(col-(row-i)>=0&&chessboard[i][col-(row-i)]==='Q')return false;
            if(col+(row-i)<n&&chessboard[i][col+(row-i)]==='Q')return false;
        }
        return true;
    };
    const rollback=(chessboard,n,row)=>{
        if(row===n){
            result++;
            return;
        }
        for(let i=0;i<n;i++){//i为列
            if(isValid(chessboard,n,row,i)){
                chessboard[row][i]='Q';
                rollback(chessboard,n,row+1);
                chessboard[row][i]=',';
            }
        }
    };
    rollback(chessboard,n,0);
    return result;
};
//console.log(totalNQueens(4));


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
    if(!head||!head.next)return head;
    let slow=head,fast=head,prev=null;
    while(fast&&fast.next){
        prev=slow;
        slow=slow.next;
        fast=fast.next.next;
    }
    prev.next=null;
    let left=sortList(head);
    let right=sortList(slow);
    return mergeLinked(left,right);
};

function mergeLinked(l1,l2){
    let dummy=new ListNode(0);
    let curr=dummy;
    while(l1&&l2){
        if(l1.val<l2.val){
            curr.next=l1;
            l1=l1.next;
        }
        else{
            curr.next=l2;
            l2=l2.next;
        }
        curr=curr.next;
    }
    curr.next=l1?l1:l2;
    return dummy.next;
}

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const wordSet=new Set(wordDict);
    const dp=Array(s.length+1).fill(false);
    dp[0]=true;
    for(let i=1;i<=s.length;i++){
        for(const word of wordSet){
            if(i>=word.length&&s.slice(i-word.length,i)===word){
                dp[i]=dp[i]||dp[i-word.length];
            }
        }
    }
    return dp[s.length];
};
// 智能拷贝CI配置脚本：
// 1.打开CIConfigHelper.exe脚本，脚本运行中
// 2.copy content（path，name，ver，size，crc）到剪切板
// 3.选中CIMemoCheck的单元格粘贴时，判断单元格中是否存在空的位置。
// 例如：
// copy content=3.1.0.2
// 如果content中存在number.number的格式，则为需要插入倒File version:[]括号中的数据
// 分支1：选中单元格中存在File version:[]，往File version:[]内插入版本号
// 分支2：选中单元格中存在File version:[1.1.1.1]，version中已经有内容了，插入一行新的{BTO:[],Filepath:[],File version:[],size:[],CRC:[],Date:[]};//按照当前选中单元格是否存在ColConfigmap中的key名。例如选中J56，则插入这个
// 并插入内容到File version中
// 分支3：选择单元格中无File version:[]，即无任何配置，此时插入新的{BTO:[],Filepath:[],File version:[],size:[],CRC:[],Date:[]};并插入到File version中

// map如下：
// ColumnConfigmap = {'J': '{BTO:[],Filepath:[],File version:[],size:[],CRC:[],Date:[]};',
//                 'K': '{BTO:[],Device name:[],Device version:[],Date:[]};',
//                 }
// 当按ctrl+B时触发该事件：
// 1.获取当前clipboard的值。
// 读取当前选中单元格的列号，例如读取到J列



function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
 
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums2, k) {
    nums2.sort(function(a, b) {
        return a - b;
        });
    console.log(nums2);
    return nums2[nums2.length-k];
};
let nums2=[3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6], k = 2;
// console.log(findKthLargest(nums2,k));

var totalNQueens = function(n) {
    let result=0;
    let chessboard=Array.from({length:n},()=>Array(n).fill(','));
    const isVaild=(chessboard,n,row,col)=>{
        for(let i=0;i<row;i++){
            if(chessboard[i][col]=='Q')return false;
            if(col-(row-i)>=0&&chessboard[i][col-(row-i)]==='Q')return false;
            if(col+(row-i)<n&&chessboard[i][col+(row-i)]==='Q')return false;
        }
        return true;
    }

    const rollback=(chessboard,n,row)=>{
        if(row===n){
            result++;
            return;
        }
        for(let i=0;i<n;i++){
            if(isVaild(chessboard,n,row,i)){
                chessboard[row][i]='Q';
                rollback(chessboard,n,row+1);
                chessboard[row][i]=',';
            }
        }
    }
    rollback(chessboard,n,0);
    return result;
}
console.log(totalNQueens(1));