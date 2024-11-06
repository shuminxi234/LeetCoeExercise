//constructor a random LinkedNode
class Node{
    constructor(val){
        this.val=val;
        this.next=null;
    }
}

class RandomNode extends Node{
    constructor(val){
        super(val);
        this.random=null;
    }
}
// function genRandomList(values,randomIndx){}
function copyRandomList(head){
    if(!head)return null;
    //step1;insert
    let current=head;
    while(current){
        let newNode=new RandomNode(current.val);
        newNode.next=current.next;
        current.next=newNode;
        current=newNode.next;
    }
    //step2;copy random Links;
    current=head;
    while(current){
        if(current.random){
            current.next.random=current.random.next;
        }
        current=current.next.next;
    }
    //step3;seprate two random links
    current=head;
    let newHead=head.next;
    let copyCurrent=newHead;
    while(current){
        current.next=current.next.next;
        if(copyCurrent.next){
            copyCurrent.next=copyCurrent.next.next;
        }
        current=current.next;
        copyCurrent=copyCurrent.next;
    }
    return newHead;
}

function generateRandomLinkedList() {
    // 创建链表节点
    let node1 = new RandomNode(7);
    let node2 = new RandomNode(13);
    let node3 = new RandomNode(11);
    let node4 = new RandomNode(10);
    let node5 = new RandomNode(1);
    
    // 建立链表的 next 关系
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    // 建立随机指针 (random)
    node1.random = null;           // 随机指针为 null
    node2.random = node1;          // 指向节点1
    node3.random = node5;          // 指向节点5
    node4.random = node2;          // 指向节点2
    node5.random = node1;          // 指向节点1
    
    return node1;  // 返回链表的头节点
}

// // 测试
// let originalList = generateRandomLinkedList();
// let copiedList = copyRandomList(originalList);

// console.log(copiedList.next.next.random);

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
// 定义链表节点//constructor a random LinkedNode
// class ListNode{
//     constructor(val){
//         this.val=val;
//         this.next=null;
//     }
// }
// 定义链表节点
function ListNode(val) {
    this.val = val;
    this.next = null;
}

var reverseBetween = function(head, left, right) {
    if (!head || left === right) return head;

    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    // Step 1: Move prev to the node just before 'left'
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }

    /*初始化：
    curr 指向 prev.next，即反转区间的第一个节点。
    next 用来存储当前节点的下一个节点，防止丢失链表。
    prev 指向节点 1，prev.next 是节点 2（即 left 位置的节点）。
    curr 指向节点 2，next 是 null，因为我们还没有反转任何节点。
    */
    // Step 2: Reverse the part between left and right
    let curr = prev.next; // 'curr' starts at position 'left'
    let next = null;
    for (let i = 0; i < right - left + 1; i++) {
        let temp = curr.next;
        curr.next = next;
        next = curr;
        curr = temp;
        console.log("temp="+temp.val+" ,curr="+curr.val+" ,next="+next.val+" ,prev="+prev.val);
    }

    // Step 3: Connect the reversed part back to the list
    prev.next.next = curr; // Connect the (left + 1)th node to the (right + 1)th node
    prev.next = next; // Connect the (left - 1)th node to the new head of the reversed part

    return dummy.next;
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Helper function to print the linked list
function printLinkedList(head) {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result.join(" -> "));
}

// Example usage:
let head = createLinkedList([1, 2, 3, 4, 5]);
let left = 2, right = 4;
let newHead = reverseBetween(head, left, right);
printLinkedList(newHead); // Output should be [1, 4, 3, 2, 5]


