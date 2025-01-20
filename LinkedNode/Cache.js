/**
 * @param {number} capacity
 */
var LinkedNodeDo=function(key,value){
    this.key=key;
    this.value=value;
    this.next=null;
    this.prev=null;
}
//need function removeNode,moveNode,removetail,moveToHead
var LRUCache = function(capacity) {
    this.capacity=capacity;
    this.cache=new Map();
    this.head=new LinkedNodeDo();
    this.tail=new LinkedNodeDo();
    this.head.next=this.tail;
    this.tail.prev=this.head;
};

LRUCache.prototype.removeNode = function(Node) {
    Node.next.prev=Node.prev;    
    Node.prev.next=Node.next;
};

LRUCache.prototype.insertNodeToHead = function(Node) {
    Node.prev=this.head;    
    Node.next=this.head.next;    
    this.head.next.prev=Node;
    this.head.next=Node;
};

LRUCache.prototype.removetail = function() {
    let node=this.tail.prev;
    this.removeNode(node);
    this.cache.delete(node);
};

LRUCache.prototype.moveToHead = function(Node) {
    this.removeNode(Node);
    this.insertNodeToHead(Node);
};
/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.cache.has(key))return -1;
    this.moveToHead(key);
    return this.cache.get(key).val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.cache.has(key)){
        this.cache.get(key).value=value;
        this.moveToHead(key);
    }
    else{
        let newNode=new ListNode(key,value);
        this.cache.set(key,newNode);
        this.insertNodeToHead(key,value);
        if(this.cache.size>this.capacity){
            this.removetail();
        }
    }
};


var reverseBetween = function(head, left, right) {
  let dummy=new ListNode(0);
  dummy.next=head;
  let prev=dummy;
  for(let i=1;i<left;i++){
    prev=prev.next;
  }
  let curr=prev.next;
  for(let i=0;i<right-left;i++){
    let Nextnode=curr.next;
    curr.next=Nextnode.next;
    Nextnode.next=prev.next;
    prev.next=Nextnode;
  }  
  return dummy.next;
};