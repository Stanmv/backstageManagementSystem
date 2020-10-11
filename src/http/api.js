export default {
  caseUrl: 'http://localhost:3000',
  menuaddUrl: '/api/menuadd', //菜单添加post
  menueditUrl: '/api/menuedit', //菜单修改post
  menuinfoUrl: '/api/menuinfo', //添加一条菜单信息get
  menulistUrl: '/api/menulist', //获取菜单总信息get
  menudeleteUrl: '/api/menudelete', //删除一条信息菜单post
  // 角色管理（工作人员角色管理）
  memberUrl: '/api/roleadd', //角色添加post
  memberlistUrl: '/api/rolelist', //角色列表获取get
  memberinfoUrl: '/api/roleinfo', //角色信息一条获取get
  membereditUrl: '/api/roleedit', //角色修改post
  memberdeleteUrl: '/api/roledelete', //角色删除post
  // 管理员管理(工作人员信息管理)
  useraddUrl: '/api/useradd', //管理员添加post
  usercountUrl: '/api/usercount', //管理员总数（用于计算分页get
  userlistUrl: '/api/userlist', //管理员列表分页get
  usereditUrl: '/api/useredit', //管理员修改post
  userinfoUrl: '/api/userinfo', //管理员获取（一条 get
  userdeleteUrl: '/api/userdelete', // 管理员删除post
  userloginUrl: '/api/userlogin', // 管理员登录post
  // 商品分类管理
  cateaddUrl: '/api/cateadd', // 商品分类添加 post
  catelistUrl: '/api/catelist', // 商品分类列表 get 直接获取istree 一级分类参数pid 二级分类参数pid
  cateinfoUrl: '/api/cateinfo', // 商品单条分类获取get
  cateeditUrl: '/api/cateedit', // 商品分类修改post
  catedeleteUrl: '/api/catedelete', // 商品分类删除post
  // 商品规格管理
  goodssizeaddUrl: '/api/specsadd', //商品规格添加post
  goodssizecountUrl: '/api/specscount', //商品规格总数get
  goodssizelistUrl: '/api/specslist', //商品规格列表get
  goodssizeinfoUrl: '/api/specsinfo', //商品规格单条获取get
  goodssizeeditUrl: '/api/specsedit', //商品规格修改post
  goodssizedeleteUrl: '/api/specsdelete', //商品规格删除post
  // 商品管理
  goodsaddUrl: '/api/goodsadd', //商品添加post
  goodscountUrl: '/api/goodscount', //商品总数获取get
  goodslistUrl: '/api/goodslist', //商品列表获取get
  goodsinfoUrl: '/api/goodsinfo', //商品信息单条获取get
  goodseditUrl: '/api/goodsedit', //商品修改post
  goodsdeleteUrl: '/api/goodsdelete', //商品删除post
  // 会员管理
  viplistUrl: '/api/memberlist', //会员列表获取 get
  vipinfoUrl: '/api/memberinfo', //会员单条获取 get
  vipeditUrl: '/api/memberedit', //会员修改 post
  // 轮播图管理
  picaddUrl: '/api/banneradd', //轮播图添加 post
  piclistUrl: '/api/bannerlist', //轮播图列表 get
  picinfoUrl: '/api/bannerinfo', //轮播图获取单条数据 get
  piceditUrl: '/api/banneredit', //轮播图修改 post
  picdeleteUrl: '/api/bannerdelete', //轮播图删除 post
  // 秒杀活动
  seckaddUrl: '/api/seckadd', //限时秒杀添加 post
  secklistUrl: '/api/secklist', //限时秒杀列表 get
  seckinfoUrl: '/api/seckinfo', //限时秒杀单条信息获取 get
  seckeditUrl: '/api/seckedit', //限时秒杀修改post
  seckdeleteUrl: '/api/seckdelete' //限时秒杀删除 post
}
