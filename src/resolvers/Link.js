function postedBy(root, args, context) {
  return context.prisma.link({ id: root.id }).postedBy();
}

function votes(root, args, context) {
  return context.prisma.link({ id: parent.id }).votes()
}

module.exports = {
  postedBy,
  votes
};
